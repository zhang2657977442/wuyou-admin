declare namespace PositionType {
  type Item = {
    id?: string;
    name: string;
    icon: string;
    pid?: string;
    children?: Item[];
    enableStatus: boolean;
    createTime: Date;
    updateTime: Date;
  };
}
