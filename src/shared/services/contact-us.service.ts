import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  apiUrl = 'https://65c0cfa6dc74300bce8cc64d.mockapi.io/Contact/profile';
  constructor(private http: HttpClient) {}

  contactUs(contactData: ContactRequest): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(this.apiUrl, contactData).pipe(
      catchError((error) => {
        console.error('Error occurred during contacting us:', error);
        throw error;
      })
    );
  }

  updateContact(
    contactData: ContactRequest,
    id: string
  ): Observable<ContactResponse> {
    const updateUrl = `${this.apiUrl}/${id}`;
    return this.http.put<ContactResponse>(updateUrl, contactData).pipe(
      catchError((error) => {
        console.error('Error occurred during updating contact:', error);
        throw error;
      })
    );
  }

  getContactById(id: string): Observable<ContactRequest> {
    const getUrl = `${this.apiUrl}/${id}`;
    return this.http.get<ContactRequest>(getUrl).pipe(
      catchError((error) => {
        console.error('Error occurred during fetch contact by id:', error);
        throw error;
      })
    );
  }

  getAllContacts(): Observable<ContactRequest[]> {
    return this.http.get<ContactRequest[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error occurred during fetch contact:', error);
        throw error;
      })
    );
  }

  deleteContact(id: string): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(deleteUrl).pipe(
      catchError((error) => {
        console.error('Error occurred during delete contact:', error);
        throw error;
      })
    );
  }
}

export interface ContactRequest {
  first_name: string;
  last_name: string;
  emailId: string;
  age: number;
  gender: string;
  mobilenumber: string;
  pan_no: string;
  adhaar_no: string;
  id?: any;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}
