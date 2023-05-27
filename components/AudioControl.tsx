import { Button } from './ui/button'

type AudioControlProps = {
  handlePlayClick: () => void
  handlePauseClick: () => void
  handleStopClick: () => void
}

export const AudioControl: React.FC<AudioControlProps> = ({ handlePlayClick, handlePauseClick, handleStopClick }) => {
  return (
    <>
      <Button onClick={handlePlayClick}>再生</Button>
      <Button onClick={handlePauseClick}>一時停止</Button>
      <Button onClick={handleStopClick}>停止</Button>
    </>
  )
}

export const useAudioControl = (audioRef: React.RefObject<HTMLAudioElement>) => {
  const handlePlayClick = () => {
    if (!audioRef.current) return
    audioRef.current.play()
  }

  const handlePauseClick = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
  }

  const handleStopClick = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
  }

  return {
    handlePlayClick,
    handlePauseClick,
    handleStopClick,
  }
}