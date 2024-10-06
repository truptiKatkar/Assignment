import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ContactRequest,
  ContactUsService,
} from '../../../../shared/services/contact-us.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  editContact!: ContactRequest | null;
  contactList!: ContactRequest[];

  constructor(
    private fb: FormBuilder,
    private contactUsService: ContactUsService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.getAllContacts();
  }

  setForm() {
    this.contactForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      gender: ['male', Validators.required],
      mobilenumber: [
        '',
        [Validators.required, Validators.pattern('^[6-9]\\d{9}$')],
      ],
      pan_no: [
        '',
        [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')],
      ],
      adhaar_no: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
    });
  }

  getAllContacts() {
    this.contactUsService.getAllContacts().subscribe(
      (response: ContactRequest[]) => {
        console.log('Fetched all contacts', response);
        this.contactList = response;
      },
      (error) => {
        console.error('Error fetching all contacts', error);
      }
    );
  }

  handleEdit(event: any) {
    console.log(event, '<==== ');
    this.editContact = event;
    this.contactForm.patchValue(event);
  }

  handleCancel() {
    this.editContact = null;
    this.contactForm.reset()
  }

  handleSubmit(contactFormData: ContactRequest) {
    if (this.editContact) {
      this.updateContact(contactFormData);
    } else {
      this.contactUsService.contactUs(contactFormData).subscribe(
        (response) => {
          console.log('Contact form submitted successfully', response);
          this.getAllContacts();
          this.handleCancel()
        },
        (error) => {
          console.error('Error submitting contact form', error);
        }
      );
    }
  }

  updateContact(contactFormData: ContactRequest) {
    this.contactUsService
      .updateContact(contactFormData, this.editContact?.id)
      .subscribe(
        (response) => {
          console.log('Contact updated successfully', response);
          this.getAllContacts();
          this.handleCancel()
        },
        (error) => {
          console.error('Error updating contact', error);
        }
      );
  }
}
