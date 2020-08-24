module "wordpress" {
    source                      =   "../vpc_resources/"
    region                      =   "us-east-1"                 #"${var.region}"
    cidr_block                  =   "10.0.0.0/16"               #"${var.cidr_block}"       
    public_cidr1                =   "10.0.101.0/24"             #"${var.public_cidr1}"   
    public_cidr2                =   "10.0.102.0/24"             #"${var.public_cidr2}"    
    public_cidr3                =   "10.0.103.0/24"             #"${var.public_cidr3}"    
    private_cidr1               =   "10.0.1.0/24"               #"${var.private_cidr1}"      
    private_cidr2               =   "10.0.2.0/24"               #"${var.private_cidr2}"     
    private_cidr3               =   "10.0.3.0/24"               #"${var.private_cidr3}"      
#    tags                        =   "${var.tags}"
    tags    =   {
        Name                    =   "VPC_Project"
        Environment             =   "Dev"
        Team                    =   "Infrastucture"
        Department              =   "IT"
        Created_by              =   "Vladyslav Bielov"
    }
}