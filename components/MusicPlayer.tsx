"use client"

import { useEffect, useRef, useState } from "react"

export default function MusicPlayer() {

  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {

    const playMusic = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.15
          await audioRef.current.play()
          setPlaying(true)
        }
      } catch (error) {
        console.log("Autoplay diblokir browser")
      }

    }

    playMusic()

  }, [])

  const toggleMusic = () => {

    if (!audioRef.current) return

    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }

  }

  return (
    <>
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:scale-110 transition z-50"
      >
        <span className={playing ? "animate-spin block" : "block"}>
          🎵
        </span>
      </button>

      <audio ref={audioRef} loop preload="auto">
        <source src="/music/background.mp3" type="audio/mpeg" />
      </audio>
    </>
  )
}