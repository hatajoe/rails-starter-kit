$(eval IMAGE := $(shell basename $(shell pwd)))
$(eval PWD := $(shell pwd))

build:
	docker build --build-arg RUBY_VERSION=$$(cat .ruby-version) --build-arg NODE_VERSION=$$(cat .node-version) -t $(IMAGE)/app:latest .

install: 
	docker run -it -v $(PWD):/opt/app $(IMAGE)/app:latest bundle init && \
	docker run -it -v $(PWD):/opt/app $(IMAGE)/app:latest bundle config --local path vendor/bundle && \
	docker run -it -v $(PWD):/opt/app $(IMAGE)/app:latest bundle add rails --skip-install && \
	docker run -it -v $(PWD):/opt/app $(IMAGE)/app:latest bundle install && \
	docker run -it -v $(PWD):/opt/app $(IMAGE)/app:latest bundle exec rails new --database=mysql --skip-spring --skip-turbolinks --skip-test --skip-system-test --no-rc . && \
	docker run -it -v $(PWD):/opt/app $(IMAGE)/app:latest bundle exec rails webpacker:install && \
	docker run -it -v $(PWD):/opt/app $(IMAGE)/app:latest bundle exec rails webpacker:install:react && \
	docker run -it -v $(PWD):/opt/app $(IMAGE)/app:latest bundle exec rails webpacker:install:typescript

run:
	docker-compose up -d && docker run -it -p 3000:3000 -p 3035:3035 -v $(PWD):/opt/app $(IMAGE)/app:latest foreman start
