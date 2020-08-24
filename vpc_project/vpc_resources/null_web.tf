resource "null_resource"  "commands_web" {
    depends_on = ["aws_instance.web"]
    triggers = {
        always_run = "${timestamp()}"
    }
    # # Push files  to remote server
    # provisioner "file" {
    #     connection {
    #     host = "${aws_instance.web.public_ip}"
    #     type = "ssh"
    #     user = "centos"
    #     private_key = "${file("~/.ssh/id_rsa")}"
    #     }
    #     source      = "r1soft.repo"
    #     destination = "/tmp/r1soft.repo"
    # }
    # Execute linux commands on remote machine
    provisioner "remote-exec" {
        connection {
        host = "${aws_instance.web.public_ip}"
        type = "ssh"
        user = "centos"
        private_key = "${file("~/.ssh/id_rsa")}"
    }
    inline = [
        "sudo yum install httpd -y",
        "sudo systemctl start httpd",
        "sudo systemctl enable httpd",
        "sudo yum install wget -y",
        "sudo yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm",
        "sudo yum -y install https://rpms.remirepo.net/enterprise/remi-release-7.rpm",
        "sudo yum -y install yum-utils",
        "sudo yum-config-manager --enable remi-php74 -y",
        "sudo yum update -y",
        "sudo yum install php php-cli php-mysql mysql -y",
        "sudo wget https://wordpress.org/latest.tar.gz",
        "sudo tar xf latest.tar.gz -C /var/www/html",
        "sudo mv /var/www/html/wordpress/* /var/www/html/",
        "sudo chown -R apache:apache /var/www/html/",
        "sudo sed -i 's/^SELINUX=.*/SELINUX=disabled/g' /etc/sysconfig/selinux",
        "sudo sed -i 's/^SELINUX=.*/SELINUX=disabled/g' /etc/selinux/config",
        "sudo systemctl restart httpd",
        "sudo reboot"
        
        ]
    }
}