import invoices from './invoices.json' with { type: 'json' }
import plays from './plays.json' with { type: 'json' }

class StatementCalculator {
  constructor() {
    this.plays = plays
    this.invoices = invoices
  }

  statement(invoice) {
    let totalAmount = 0
    let volumeCredits = 0
    let result = `Statement for ${invoice.customer}\n`

    for (let perf of invoice.performances) {
      volumeCredits += this.volumeCreditsFor(perf)

      // print line for this order
      result += `  ${this.playFor(perf).name}: ${this.usd(this.amountFor(perf) / 100)} (${perf.audience} seats)\n`
      totalAmount += this.amountFor(perf)
    }

    result += `Amount owed is ${this.usd(totalAmount / 100)}\n`
    result += `You earned ${volumeCredits} credits\n`
    return result
  }

  volumeCreditsFor(aPerformance) {
    let result = 0
    result += Math.max(aPerformance.audience - 30, 0)
    if ('comedy' === this.playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5)
    return result
  }

  amountFor(aPerformance) {
    let result = 0
    switch (this.playFor(aPerformance).type) {
      case 'tragedy':
        result = 40000
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30)
        }
        break
      case 'comedy':
        result = 30000
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20)
        }
        result += 300 * aPerformance.audience
        break
      default:
        throw new Error(`unknown type: ${this.playFor(aPerformance).type}`)
    }
    return result
  }

  playFor(aPerformance) {
    return plays[aPerformance.playID]
  }

  usd(aNumber) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(
      aNumber / 100,
    )
  }

  printAll() {
    this.invoices.forEach(invoice => console.log(this.statement(invoice, plays)))
  }
}

const statement = new StatementCalculator()
statement.printAll()
