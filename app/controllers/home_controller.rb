class HomeController < ApplicationController
  def index
    @rows = 10
    @columns = 10
  end

  def prime_factors(n)
    factors = []
    Prime.each((n/2).to_i) do |prime|
      while (n % prime).zero? do
        factors << prime
        n = n/prime
      end
    end
    factors
  end

  def primes_table
    n = (params[:table_size] || 10).to_i
    @primes_table = PrimeTable::new(n).to_s
  end
end
