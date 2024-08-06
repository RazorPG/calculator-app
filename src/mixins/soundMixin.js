export const soundMixin = {
    data: function() {
        return {
            audioFiles: {
                operator: '/sounds/button-operator.wav',
                operand: '/sounds/button-operand.wav',
                allclear: '/sounds/button-ac.wav',
                remove: '/sounds/button-remove.wav',
                equal: '/sounds/button-equal.wav'
            }
        }
    },
    methods: {
      playClickSound(sound) {
        const audio = new Audio(this.audioFiles[sound]);
            audio.play();
     },
  }
}