resource "aws_route_table" "rt_pub" {
  vpc_id     = "${aws_vpc.main.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.gw.id}"
  }
}

resource "aws_route_table_association" "rt_pub_a" {
  subnet_id      = "${aws_subnet.public1.id}"
  route_table_id = "${aws_route_table.rt_pub.id}"
}


resource "aws_route_table_association" "rt_pub_b" {
  subnet_id      = "${aws_subnet.public2.id}"
  route_table_id = "${aws_route_table.rt_pub.id}"
}


resource "aws_route_table_association" "rt_pub_c" {
  subnet_id      = "${aws_subnet.public3.id}"
  route_table_id = "${aws_route_table.rt_pub.id}"
}