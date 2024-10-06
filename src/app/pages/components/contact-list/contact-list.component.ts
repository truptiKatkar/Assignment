import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ContactRequest,
  ContactUsService,
} from '../../../../shared/services/contact-us.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent implements OnInit {
  @Output() contactEdit = new EventEmitter<any>();
  @Input() contactList!: ContactRequest[];

  constructor(private contactUsService: ContactUsService) {}

  ngOnInit(): void {
  }

  handleEdit(contact: ContactRequest) {
    console.log(contact);
    this.contactEdit.emit(contact);
  }

  handleDelete(contactId: string) {
    this.contactUsService.deleteContact(contactId).subscribe(
      () => {
        console.log('Contact deleted successfully');
      },
      (error) => {
        console.error('Error deleting contact', error);
      }
    );
  }
}
