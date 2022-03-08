import { useCallback, useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { ToastOptions } from 'react-hot-toast/dist/core/types'
import { useDispatch, useSelector } from 'react-redux'
import useUpdateEffect from 'react-use/lib/useUpdateEffect'
import classNames from 'classnames'
import { ControlsPanel, GamePanel } from '../components/organisms'
import { Cell } from '../models'
import { GameBoard, GamePlayerNotifier } from '../services'
import { IWinningState } from '../services/GameBoard/interfaces'
import GameBotWorker from '../services/GameBot/GameBot.worker'
import { TGameBotWorkerMessageEvent } from '../services/GameBot/interfaces'
import { isCellCoordinates } from '../services/GameBot/typeguards'
import { chooseCell, resetGame as resetGameActionCreator } from '../store/actions'
import { GameBoardSize, PlayerOpponent } from '../store/game/constants'
import { getCurrentPlayer, getGameMap } from '../store/game/reducer'
import { TRootState } from '../store/interfaces'
import { EColor } from '../styles/EColor'
import { EPlayerType } from '../types/Game'
import { fieldsQuantityToWin, PlayerName, PlayerTurnMessage, PlayerWinningMessage } from './constants'
import './App.scss'

const mapState = (state: TRootState) => ({
  gameMap: getGameMap(state),
  currentPlayer: getCurrentPlayer(state),
})

const bot = new GameBotWorker()
const playerTurnNotifier = new GamePlayerNotifier<EPlayerType>({
  PlayerName,
  PlayerMessage: PlayerTurnMessage,
  notifier: toast,
})
const winningStateNotifier = new GamePlayerNotifier<EPlayerType>({
  PlayerName,
  PlayerMessage: PlayerWinningMessage,
  notifier: toast,
})

const toastOptions: ToastOptions = {
  style: {
    borderRadius: '3px',
    border: `${EColor.MAIN} solid 3px`,
    color: EColor.WHITE,
    backgroundColor: EColor.BLACK,
  },
}

const defaultWinningState: IWinningState = {
  isWon: false,
  player: undefined,
}

const App = () => {
  const { gameMap, currentPlayer } = useSelector(mapState)
  const [gameBoard, setNewGameBoard] = useState<GameBoard>(() => new GameBoard(gameMap, fieldsQuantityToWin))
  const [winningState, setWinningState] = useState<IWinningState>(defaultWinningState)
  const currentPlayerRef = useRef<EPlayerType>(currentPlayer)
  currentPlayerRef.current = currentPlayer

  const dispatch = useDispatch()
  const makePlayerChoice = useCallback(
    (cell: Cell) => {
      gameBoard.setPlayerChoice(currentPlayerRef.current, cell.coordinates)
      dispatch(chooseCell(cell))
    },
    [dispatch, gameBoard],
  )

  useEffect(() => {
    const onMessage = (event: TGameBotWorkerMessageEvent) => {
      const { action, winningState: winningStateResult, bestCoordinates } = event.data

      switch (action) {
        case 'newMove':
          makePlayerChoice(new Cell(bestCoordinates.y, bestCoordinates.x, GameBoardSize))
          playerTurnNotifier.notify(EPlayerType.circle)
          break
        case 'gameOver':
          setWinningState(winningStateResult)
          if (winningStateResult.player === EPlayerType.cross && isCellCoordinates(bestCoordinates)) {
            makePlayerChoice(new Cell(bestCoordinates.y, bestCoordinates.x, GameBoardSize))
          }
          winningStateNotifier.notify(winningStateResult.player!)
          break
      }
    }
    bot.addEventListener('message', onMessage)

    return () => bot.removeEventListener('message', onMessage)
  }, [setWinningState, makePlayerChoice])
  useUpdateEffect(() => {
    if (currentPlayer === EPlayerType.cross) {
      playerTurnNotifier.notify(EPlayerType.cross)
      bot.postMessage({ action: 'getBestMove', gameMap: gameBoard.state, fieldsQuantityToWin })
    }
  }, [currentPlayer, gameBoard])

  useUpdateEffect(() => {
    if (!winningState.isWon) {
      setNewGameBoard(new GameBoard(gameMap, fieldsQuantityToWin))
    }
  }, [winningState.isWon, setNewGameBoard])

  const resetGame = useCallback(() => {
    dispatch(resetGameActionCreator())
    setWinningState(defaultWinningState)
  }, [dispatch, setWinningState])

  return (
    <>
      <Toaster position="top-center" toastOptions={toastOptions} />
      <ControlsPanel currentPlayer={currentPlayer} PlayerName={PlayerName} resetGame={resetGame} winningState={winningState} />
      <section
        className={classNames(`app_${winningState?.isWon ? PlayerOpponent[currentPlayer] : currentPlayer}`, {
          app_disabled: winningState?.isWon,
        })}
      >
        <GamePanel gameMap={gameMap} chooseCell={makePlayerChoice} />
      </section>
    </>
  )
}

export default App
