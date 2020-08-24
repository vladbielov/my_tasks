# resource "null_resource"  "commands_db" {
#     depends_on = ["aws_instance.db"]
#     triggers = {
#         always_run = "${timestamp()}"
#     }
#     # # Push files  to remote server
#     # provisioner "file" {
#     #     connection {
#     #     host = "${aws_instance.web.public_ip}"
#     #     type = "ssh"
#     #     user = "centos"
#     #     private_key = "${file("~/.ssh/id_rsa")}"
#     #     }
#     #     source      = "r1soft.repo"
#     #     destination = "/tmp/r1soft.repo"
#     # }
#     # Execute linux commands on remote machine
#     provisioner "remote-exec" {
#         connection {
#         host = "${aws_instance.db.public_ip}"
#         type = "ssh"
#         user = "centos"
#         private_key = "${file("~/.ssh/id_rsa")}"
#     }
#     # inline = [
#     #     "sudo yum install mariadb-server -y",
#     #     "sudo systemctl start mariadb",
#     #     "sudo systemctl enable mariadb",
#     #     "sudo mysql << _EOF_
#     #      CREATE DATABASE wordpressdb;
#     #      GRANT ALL ON wordpressdb.* TO 'admin'@'%' IDENTIFIED BY 'redhat';
#     #      _EOF_"


#     #     ]
#     }
#}