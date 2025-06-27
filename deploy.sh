
sudo apt update -y

sudo apt install -y docker.io

sudo systemctl start docker

sudo systemctl enable docker

sudo docker build -t jobfinderapp .

sudo docker run -d -p 80:8081 jobfinderapp
