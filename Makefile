help:
	@echo '---------- 環境構築に関するコマンド -----------'
	@echo 'init           -- プロジェクト初期のセットアップを行います。'
	@echo ''
	@echo '---------- appに関するコマンド ----------'
	@echo 'start            -- dev-serverを起動します。'
	@echo 'build            -- buildを実行します。'
	@echo 'test             -- testを実行します。'
	@echo ''
	@echo '---------- Gitに関するコマンド ----------'
	@echo 'git-setup      -- Gitのローカル環境のuser.nameとuser.emailを設定します'
	@echo '---------- Huskyに関するコマンド ----------'
	@echo 'husky-setup    -- Huskyの初期設定をします'

init:
	@make husky-setup
	@make npm-install
	@make start

npm-install:
	npm i

start:
	react-app-rewired start

build:
	react-app-rewired build && node build-lib

test:
	react-app-rewired test

git-setup:
	$(shell ./.make/setup_git.sh)

husky-setup:
	npm i && npx husky install
