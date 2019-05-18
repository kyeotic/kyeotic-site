SITE_NAME="k.kyeotic.com"

apply:
	cd infrastructure && \
	terraform init && \
	terraform apply

teardown:
	cd infrastructure && \
	terraform init && \
	terraform destroy

format:
	cd infrastructure && terraform fmt

pack: 
	npm run build

sync:
	aws s3 sync build s3://${SITE_NAME}
	aws s3 cp build/index.html s3://${SITE_NAME}/index.html --cache-control max-age=0

deploy: pack sync
