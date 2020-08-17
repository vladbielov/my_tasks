resource "null_resource"  "commands" {
    depends_on = ["aws_instance.web_nagios"]
    triggers = {
        always_run = "${timestamp()}"
    }
   
     # Execute linux commands on remote machine
     provisioner "remote-exec" {
        connection {
        host = "${aws_instance.web_nagios.public_ip}"
        type = "ssh"
        user = "centos"
        private_key = "${file("~/.ssh/id_rsa")}"
    }
     inline = [
        "sudo curl https://assets.nagios.com/downloads/nagiosxi/install.sh | sudo sh"
        

        ]
    }
}