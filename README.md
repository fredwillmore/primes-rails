
This project was originally created for a code challenge interview question. I've augmented it by expanding the table builder to any value of n, and providing a demo of the prime number finding algorithm. Here is the original project description and developer notes:

#### Objective:

Write a program that prints out a multiplication table of the first 10 prime number.

1. The program must run from the command line and print one table to STDOUT.
2. The first row and column of the table should have the 10 primes, with each cell containing the product of the primes for the corresponding row and column.

#### Notes

1. Consider complexity. How fast does your code run? How does it scale?
2. Consider cases where we want N primes.
3. Do not use the Prime class from stdlib (write your own code).

#### Developer Notes:

I tackled the tedious work formatting of the table first, saving the fun math for last. My first test stubbed the 'primes' method with a more manageable sized array that would still present the same formatting issues. The next test was actually created after getting the table working with ten primes, and is there to test the proposed use case. The next test confirms the class generates the expected values for ten primes. The last two tests are to see how well the system scales to 1000 and 5000. 

I added the ability to do some formal timing profiling on the method to find n primes, as well as to run the entire process. I added support for modifying the value of n in order to get a view of algorithmic complexity.

to run the tests:

`rspec prime_table.rb`

to view the full table:

`ruby prime_table.rb print 10`

to view the benchmark for finding the primes:

`ruby prime_table.rb primes 10`

I ran some timing tests for various values of n:

    ❯❯❯ ruby prime_table.rb primes 100
      0.000890   0.000016   0.000906 (  0.000901)
    ❯❯❯ ruby prime_table.rb primes 1000
      0.109983   0.000551   0.110534 (  0.110759)
    ❯❯❯ ruby prime_table.rb primes 2000
      0.350727   0.000589   0.351316 (  0.351830)
    ❯❯❯ ruby prime_table.rb primes 3000
      0.819364   0.000904   0.820268 (  0.821434)
    ❯❯❯ ruby prime_table.rb primes 4000
      1.558909   0.003557   1.562466 (  1.566498)
    ❯❯❯ ruby prime_table.rb primes 5000
      2.425115   0.003439   2.428554 (  2.433004)
    ❯❯❯ ruby prime_table.rb primes 6000
      3.563627   0.004475   3.568102 (  3.573138)
    ❯❯❯ ruby prime_table.rb primes 7000
      4.966413   0.006944   4.973357 (  4.980994)
    ❯❯❯ ruby prime_table.rb primes 8000
      6.575124   0.008978   6.584102 (  6.598694)
    ❯❯❯ ruby prime_table.rb primes 9000
      8.580262   0.018797   8.599059 (  8.620227)
    ❯❯❯ ruby prime_table.rb primes 10000
    10.337781   0.014115  10.351896 ( 10.373717)
    ❯❯❯ ruby prime_table.rb primes 20000
    45.909281   0.065722  45.975003 ( 46.057366)

Note that doubling **n** approximately quadruples the run time, which suggests a **big-O factor of n squared** dominating with larger n. (eg, going from n=5000 to n=10000 increases runtime from ~2.5s to ~10s)

I assumed that for the purpose of the exercise I would be expected to show a method of calculating the primes as opposed to just using a hard-coded list. I used the **'Sieve of Eratosthenes'**, which is the most intuitive and straightforward implementation of a sieve, and performs well for smaller values of n. Generally, a sieve is an algorithm that starts with all the numbers up to a certain limit, and eventually discards all the non-prime values. The `calculate_primes` and `next_prime` method implement the sieve.

One of the difficulties with implementing a sieve is knowing how many numbers to start with. That is, what is the upper bound on the nth prime number. I found a proof I sort of understood that **n squared** is an upper bound. However, n squared is a lot of numbers to work with. I found an article that was well-reviewed with a function closer to **n(log n)** for an upper bound. I implemented that function in `upper_limit` (along with a method `ln` to make it a little more readable).

This solution would not scale well for n in the thousands or greater. I did try to make sure the really expensive calculations were only performed once. Beyond the obvious optimization of relying on a list of known primes, some optimizations to consider for the purpose of scaling would be: 

1. note that the table of calculated values is symmetric about the diagonal and could be stored using half the memory and generated with just half the calculations.
2. The mathematics are beyond me but I understand there are sieves with better performance for greater values of n. I used Eratosthenes because it's easy to understand and implement, and is fine for smaller n.
3. the initial calculation of the primes takes a lot of memory. I understand there are methods to limit the size of the sieve, but they would make the implementation more complex.
