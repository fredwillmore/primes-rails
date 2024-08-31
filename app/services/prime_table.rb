require 'prime'

class PrimeTable
  attr_accessor :n

  def initialize(n = 10)
    @n = n
  end
  
  def primes
    @primes ||= calculate_primes
  end
  
  def table
    @table ||= headers.map do |y| 
      headers.map { |x| x * y }
    end
  end
  
  def to_s
    table.map { |row| format_row row }.join("\n")
  end
  
  def print
    puts to_s
  end
  
  private
  
  def ln value
    Math::log value
  end
  
  def upper_limit
    @upper_limit = 6 if n < 4 
    @upper_limit ||= (n * (ln(n) + ln(ln(n)))).to_i
  end
  
  def calculate_primes
    sieve = [false, false] + upper_limit.times.map { true }
    n.times.map do
      next_prime sieve
    end
  end
  
  def next_prime sieve
    prime = sieve.find_index true
    (0...sieve.length).step(prime).each do |i|
      sieve[i] = false
    end
    prime
  end
  
  def width x
    table[x].map { |value| value.to_s.length }.max 
  end
  
  def headers
    [1] + primes
  end
  
  def format_row row
    row.each_with_index.map do |v, i|
      format_value v, i
    end.join " "
  end
  
  def format_value v, i
    format = "%#{width i}.#{width i}s" 
    value = v == 1 ? '' : v
    format % value
  end
end
