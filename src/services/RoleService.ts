import  {NewBaseService} from "./BaseService";

class RoleService extends NewBaseService<IRole> {
  constructor() {
    super();
    this.path = '/roles';
  }
}

export default new RoleService();

export interface IRole {
  id?: number;
  name: string;
  desc: string;
  status: number;
  role_router: string | any[];
}
