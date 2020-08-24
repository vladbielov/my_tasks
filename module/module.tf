module "app1" {
  source   = "../t_17aug2020"
  region   = "us-east-1"
  key_name = "asg-key-pair"            
  image_owner = "099720109477"          
  desired_capacity = 1
  max_size = 1
  min_size = 1
}
