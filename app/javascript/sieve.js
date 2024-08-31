class Sieve {

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getNode(n) {
    return $("#thing_" + n)
  }
  
  markPrime(n) {
    this.mark(n, 'prime')
  }

  markNonprime(n) {
    this.mark(n, 'nonprime')
  }

  isMarked(n) {
    return this.getNode(n).data('marked') == 'true'
  }
  
  unmarkNode(node) {
    $(node).data('marked', 'false')
    $(node).removeClass('marked-prime')
    $(node).removeClass('marked-nonprime')
  }
  
  unmarkNodes() {
    $('.node').each((i, node) => this.unmarkNode(node))
  }
  
  setInfoContent(content) {
    $("#current-number-info").html(content)
  }

  async mark(n, primeness) {
    let node = this.getNode(n)

    node.data('marked', 'true');
    node.removeClass('marked-' + primeness);
    node.addClass('active-' + primeness);
    await this.delay(200);
    node.removeClass('active-' + primeness);
    node.addClass('marked-' + primeness);
  }
    
  async markNumbers() {
    let n = $('.node').length
    let primes = []

    let delayTimePrime = 400
    let delayTimeNonprime = 200

    this.markNonprime(1)
    await this.delay(delayTimePrime);

    for(let i=2; i<=n; i++) {
      if(!this.isMarked(i)) {
        this.setInfoContent("Current prime: " + i)
        this.markPrime(i)
        await this.delay(delayTimePrime);
        primes.push(i)

        let j = i

        do {
          j = j + i
          this.markNonprime(j)
          await this.delay(delayTimeNonprime);
        } while (j <= n)

        await this.delay(delayTimePrime);
      }
    }
    this.setInfoContent("Primes: " + primes.join(', '))
    this.showRunAgain()
  }
  
  showRunAgain() {
    $('#run-again-container').show()
    $('#run-again').on('click', () => this.run())
  }

  hideRunAgain() {
    $('#run-again-container').hide()
    $('#run-again').on('click', null)    
  }

  setTooltips() {
    $('.node').each(
      function (k, v){
        let node = $(v)
        node.tooltip();
      }
    )
  }

  run() {
    this.unmarkNodes()
    this.hideRunAgain()
    this.setTooltips()
    this.markNumbers()
  }
}

export default Sieve;
