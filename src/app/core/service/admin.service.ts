import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberView } from '../model/admin/memberView';
import { environment } from '../../../environments/environment.development';
import { MemberAddEdit } from '../model/admin/memberAddEdit';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  getMembers() {
    return this.http.get<MemberView[]>(
      `${environment.apiUrl}Admin/get-members`
    );
  }
  getMember(id: string) {
    return this.http.get<MemberAddEdit>(
      `${environment.apiUrl}/api/admin/get-member/${id}`
    );
  }
  getApplicationRoles() {
    return this.http.get<string[]>(
      `${environment.apiUrl}/api/admin/get-application-roles`
    );
  }
  addEditMember(model: MemberAddEdit) {
    return this.http.post(
      `${environment.apiUrl}/api/admin/add-edit-member`,
      model
    );
  }
  lockMember(id: string) {
    return this.http.put(
      `${environment.apiUrl}Admin/lock-member/${id}`,
      {}
    );
  }
  unlockMember(id: string) {
    return this.http.put(
      `${environment.apiUrl}Admin/unlock-member/${id}`,
      {}
    );
  }
  deleteMember(id: string) {
    return this.http.delete(
      `${environment.apiUrl}Admin/delete-member/${id}`,
      {}
    );
  }
}
