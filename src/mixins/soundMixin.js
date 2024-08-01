export const soundMixin = {
    data: function() {
        return {
            audioFiles: {
                operator: '/sounds/button-operator.mp3',
                operand: '/sounds/button-operand.mp3',
                allclear: '/sounds/button-ac.mp3',
                remove: '/sounds/button-remove.mp3',
                equal: '/sounds/button-equal.mp3'
            }
        }
    },
    methods: {
      playClickSound(sound) {
        const audio = new Audio(this.audioFiles[sound]);
        audio.play();
      },
    },
  };