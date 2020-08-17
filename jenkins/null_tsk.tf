resource "null_resource"  "commands" {
    depends_on = ["aws_instance.web_jenkins"]
    triggers = {
        always_run = "${timestamp()}"
    }
   
     # Execute linux commands on remote machine
     provisioner "remote-exec" {
        connection {
        host = "${aws_instance.web_jenkins.public_ip}"
        type = "ssh"
        user = "centos"
        private_key = "${file("~/.ssh/id_rsa")}"
    }
     inline = [
        "sudo yum install wget -y",
        "sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat/jenkins.repo",
        "sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key",
        "sudo yum upgrade -y",
        "sudo yum install jenkins java-1.8.0-openjdk-devel -y",
        "sudo service jenkins start"
        



        ]
    }
}