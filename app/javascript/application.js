// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "jquery"
import "popper"
import "bootstrap"

$(document).ready(function() {
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const getNode = (n) => $("#thing_" + n)

  async function mark(n, primeness) {
    let node = getNode(n)

    node.data('marked', 'true');
    node.removeClass('marked-' + primeness);
    node.addClass('active-' + primeness);
    await delay(200);
    node.removeClass('active-' + primeness);
    node.addClass('marked-' + primeness);
  }

  function markPrime(n) {
    mark(n, 'prime')
  }
  
  function markNonprime(n) {
    mark(n, 'nonprime')
  }

  function isMarked(n) {
    return getNode(n).data('marked') == 'true'
  }

  function addFactor(i, j) {
    // timing of updating the tooltip text was too tricky
    // just handling it ahead of time in ruby in the controller
    let node = getNode(j)
    let factors = node.data('factors') ? node.data('factors').split(',') : []
    factors.push(i)
    node.data('factors', factors.join(','))
  }
  
  function unmarkNode(node) {
    $(node).data('marked', 'false')
    $(node).removeClass('marked-prime')
    $(node).removeClass('marked-nonprime')
  }
  
  function unmarkNodes() {
    $('.node').each((i, node) => unmarkNode(node))
  }
  
  function setInfoContent(content) {
    $("#current-number-info").html(content)
  }
  
  async function markNumbers() {
    let n = $('.node').length
    let primes = []

    let delayTimePrime = 4
    let delayTimeNonprime = 2

    markNonprime(1)
    await delay(delayTimePrime);

    for(let i=2; i<=n; i++) {
      if(!isMarked(i)) {
        setInfoContent("Current prime: " + i)
        markPrime(i)
        await delay(delayTimePrime);
        primes.push(i)

        let j = i

        do {
          j = j + i
          markNonprime(j)
          // addFactor(i, j)
          await delay(delayTimeNonprime);
        } while (j <= n)

        await delay(delayTimePrime);
      }
    }
    setInfoContent("Primes: " + primes.join(', '))
    showRunAgain()
  }
  
  function hideRunAgain() {
    $('#run-again-container').hide()
    $('#run-again').on('click', null)    
  }
  
  function showRunAgain() {
    $('#run-again-container').show()
    $('#run-again').on('click', runAgain)
  }
  
  function runAgain() {
    unmarkNodes()
    markNumbers()
  }

  function composeTooltipContent(n) {
    let node = getNode(n)
    let title
    if(isMarked(node.data('number'))){
      title = "number: " + node.data('number')
        + "\nfactors: " + node.data('factors')
        + "\nfactors: " + node.data('factors')
    } else {
      title = node.data('number')
    }
    return title
  }

  function setTooltips() {
    $('.node').each(
      function (k, v){
        let node = $(v)
        // node.tooltip("dispose")
        // debugger
        node.tooltip();
      }
    )

    // $('.node').on('show.bs.tooltip', function (event) {
    //   let node = $(event.target)
    //   console.log('toooltippin', node)
    //   let title = "factors: " + node.data('factors')
    //   node.tooltip("dispose")
    //   node.tooltip({
    //     title: title,
    //     html: true
    //   })
    //   // $(node.target).data('bs-original-title', 'foo shnickens')
    // })
  }

  hideRunAgain()
  setTooltips()
  markNumbers()
})
