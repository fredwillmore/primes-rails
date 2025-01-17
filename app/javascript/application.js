// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "jquery"
import "popper"
import "bootstrap"

import Sieve from 'sieve';

$(function() {
  new Sieve().run()

  $('#table_size').on('change', function(e) {
    e.target.form.requestSubmit()
  })  
})
