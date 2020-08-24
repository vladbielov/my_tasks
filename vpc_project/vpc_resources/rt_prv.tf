resource "aws_route_table" "rt_prv" {
  vpc_id     = "${aws_vpc.main.id}"

  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = "${aws_nat_gateway.ngw.id}"
  }
}

resource "aws_route_table_association" "rt_prv_a" {
  subnet_id      = "${aws_subnet.private1.id}"
  route_table_id = "${aws_route_table.rt_prv.id}"
}


resource "aws_route_table_association" "rt_prv_b" {
  subnet_id      = "${aws_subnet.private2.id}"
  route_table_id = "${aws_route_table.rt_prv.id}"
}


resource "aws_route_table_association" "rt_prv_c" {
  subnet_id      = "${aws_subnet.private3.id}"
  route_table_id = "${aws_route_table.rt_prv.id}"
}