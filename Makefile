
app_dir = /data/apps/abodlee
temp_install_dir = /tmp/abodlee
deployment_hostname = abodlee.app
app_conf = abodlee

install :
	mv ./config.js ./config.development.js
	cp ./config.production.js config.js
	sudo mkdir -p $(app_dir)
	sudo cp -r ./ $(app_dir)/
	sudo cp ./$(app_conf).conf /etc/init/$(app_conf).conf
	make start_app

start_app :
	sudo stop $(app_conf)
	sudo start $(app_conf)

