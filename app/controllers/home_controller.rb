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
end
