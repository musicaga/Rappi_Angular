interface ICustomer {
  company: string;
  application: string;
  isActive: boolean;
  profileImage: ProfileImage;
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface ProfileImage {
  url: string;
  _id: string;
}