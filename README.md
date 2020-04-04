# rails-starter-kit

Launching isolated Ruby on Rails runtime environment by using Docker container.
This contains webpacker and foreman.

# Prerequisite

rails-starter-kit uses docker and direnv. Please install and setup first.

- docker
  - https://docs.docker.com/get-docker/
- direnv
  - https://direnv.net/

after finished the above step, next to copy and paste .direnvrc.copy contents to your ~/.direnvrc (or create)

# Setup

```
% make build
% make install
```

modify host value in config/database.yml:

```diff
 default: &default
   adapter: mysql2
   encoding: utf8mb4
   pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
   username: root
   password:
-  host: localhost
+  host: host.docker.internal
```

setup initiali database:

```
% rails db:setup
```

# Launching appliation

```
% make run
% open localhost:3000
```

# Common use-cases

## RuboCop setup

Add rubocop to Gemfile and install:

```diff
 group :development, :test do
   # Call 'byebug' anywhere in the code to stop execution and get a debugger console
   gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
   gem 'rspec-rails'
+  gem 'rubocop', require: false
+  gem 'rubocop-performance', require: false
+  gem 'rubocop-rails', require: false
+  gem 'rubocop-rspec', require: false
 end
```

```
% bundle install
```

rails-starter-kit has default settings in .rubocop.yml.

run RuboCop:

```
% bundle exec rubocop
```

## eslint + prettier setup

insatll eslint and prettier with helpful plugins.

```
% yarn add -D eslint prettier 
% yarn add -D eslint-plugin-react@latest eslint-plugin-jsx-a11y@latest eslint-plugin-import@latest eslint-import-resolver-typescript@latest @typescript-eslint/eslint-plugin@latest eslint-config-airbnb@latest @typescript-eslint/parser@latest
% yarn add -D eslint-config-prettier eslint-plugin-prettier
```

rails-starter-kit has default settings in .eslintrc.js and .prettierrc.

run eslint:

```
% yarn eslint app/javascript --ext ts,tsx
```

## RSpec setup

Add rspec to Gemfile and install:

```diff
 group :development, :test do
   # Call 'byebug' anywhere in the code to stop execution and get a debugger console
   gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
+  gem 'rspec-rails'
 end
```

```
% bundle install
```

initialize RSpec:

```
% rails generate rspec:install
```

run RSpec:

```
% bundle exec rspec
```

# frontend

rails-starter-kit has small sample of frontend application using React + redux-toolkit.

install dependencies:

```
% yarn add @reduxjs/toolkit react-redux redux-thunk react-router react-router-dom @material-ui/core @material-ui/icons
```

generate entrypoint controller:

```
% rails g controller Entrypoint index
```

modify config/routes.rb

```diff
 Rails.application.routes.draw do
+  get '*path', to: 'entrypoint#index', constraints: lambda {|request|
+    !request.xhr? && request.format.html?
+  }
+  root 'entrypoint#index'
   # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
```

modify config/webpacker.yml:

```diff
 # Note: You must restart bin/webpack-dev-server for changes to take effect

 default: &default
-  source_path: app/javascript
+  source_path: frontend
```

modify config/webpack/environment.js for design-system:

```diff
 environment.loaders.prepend('typescript', typescript)
+
+environment.config.merge({
+  resolve: {
+    alias: {
+      '@ds': '../../@ds'
+    }
+  }
+});
+
```

modify app/views/entrypoint.html.erb

```diff
-<h1>Entrypoint#index</h1>
-<p>Find me in app/views/entrypoint/index.html.erb</p>
+<section>
+  <%= javascript_packs_with_chunks_tag 'entrypoint' %>
+</section>
```

# Licence

MIT
