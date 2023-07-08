let app = {
  props: ['db'],
  components: {
    // DataTaskManager: () => import(/* webpackChunkName: "components/DataTaskManager" */ './DataTaskManager/DataTaskManager.vue')
  },
  data () {    
    this.$i18n.locale = this.db.localConfig.locale
    return {
      voteScores: [5, 3, 1],
      sendingScore: null
    }
  },
  watch: {
    'db.localConfig.locale'() {
      this.$i18n.locale = this.db.localConfig.locale;
    },
    sendingScore () {
      if (this.sendingScore > 0) {
        setTimeout(() => {
          this.sendingScore = null
        }, 3000)
      }
    }
  },
  computed: {
    computedStyle () {
      let len = this.voteScores.length;
      return {
        height: `calc((100vh - (2rem * ${len+1})) / ${len})`
      }
    }
  },
  mounted() {
    
  },
  methods: {
    sendVote: async function (score = 1) {
      await this.db.utils.AxiosUtils.post(this.db.config.voteURL, {vote: score})
      this.sendingScore = score
    }
  }
}

export default app