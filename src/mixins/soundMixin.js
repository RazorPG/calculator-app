export const soundMixin = {
  data: function () {
    return {
      audioFiles: {
        operator: '/sounds/button-operator.wav',
        operand: '/sounds/button-operand.wav',
        allclear: '/sounds/button-ac.wav',
        remove: '/sounds/button-remove.wav',
        equal: '/sounds/button-equal.wav',
      },
      audioCache: {},
    }
  },
  methods: {
    async preloadAudio(sound) {
      if (!this.audioCache[sound]) {
        try {
          const audio = new Audio(this.audioFiles[sound])
          await new Promise((resolve, reject) => {
            audio.oncanplaythrough = resolve
            audio.onerror = reject
            audio.load()
          })
          this.audioCache[sound] = audio
        } catch (error) {
          console.error(`Failed to preload sound: ${sound}`, error)
        }
      }
    },
    async playClickSound(sound) {
      if (!this.audioCache[sound]) {
        await this.preloadAudio(sound)
      }
      try {
        const audio = this.audioCache[sound]
        if (audio) {
          audio.currentTime = 0 // Reset audio to start
          await audio.play()
        }
      } catch (error) {
        console.error(`Failed to play sound: ${sound}`, error)
      }
    },
  },
  created() {
    // Preload all audio files when the component is created
    Object.keys(this.audioFiles).forEach(sound => this.preloadAudio(sound))
  },
}
