import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { MemberView } from '../../../core/model/admin/memberView';
import { AdminService } from '../../../core/service/admin.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//@ts-ignore
const $ = window['$'];
@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.scss',
})
export class UserCrudComponent {
  members: MemberView[] = [];
  memberToDelete: MemberView | undefined;
  @ViewChild('modal') modal?: ElementRef;
  constructor(
    private adminService: AdminService,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.adminService.getMembers().subscribe({
      next: (members) => {
        this.members = members;
      },
    });
  }
  lockMember(id: string) {
    this.adminService.lockMember(id).subscribe({
      next: (_) => {
        this.handleLockUnlockFilterAndMessage(id, true);
      },
    });
  }
  unlockMember(id: string) {
    this.adminService.unlockMember(id).subscribe({
      next: (_) => {
        this.handleLockUnlockFilterAndMessage(id, false);
      },
    });
  }
  private handleLockUnlockFilterAndMessage(id: string, locking: boolean) {
    let member = this.findMember(id);
    if (member) {
      member.isLocked = !member.isLocked;
      if (locking) {
        this.toastrService.success(
          `Member ${member.firstName} has been locked`
        );
      } else {
        this.toastrService.success(
          `Member${member.firstName} has been unlocked`
        );
      }
    }
  }
  private findMember(id: string): MemberView | undefined {
    let member = this.members.find((x) => x.id === id);
    if (member) {
      return member;
    }
    return undefined;
  }
  confirm() {
    if (this.memberToDelete) {
      this.adminService.deleteMember(this.memberToDelete.id).subscribe({
        next: (_) => {
          this.toastrService.success(
            `Member ${this.memberToDelete?.firstName} has been deleted`
          );
          this.members = this.members.filter(
            (x) => x.id !== this.memberToDelete?.id
          );
          this.memberToDelete = undefined;
          this.closeModal();
        },
      });
    }
  }
  decline() {
    this.memberToDelete = undefined;
    this.closeModal();
  }
  deleteMember(id: string) {
    let member = this.findMember(id);
    if (member) {
      this.memberToDelete = member;
      this.openModal();
    }
  }
  openModal() {
    $(this.modal?.nativeElement).modal('show');
  }
  closeModal() {
    $(this.modal?.nativeElement).modal('hide');
  }
}
