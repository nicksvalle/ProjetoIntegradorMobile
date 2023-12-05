import { TestBed } from '@angular/core/testing';

import { ManageTeacherService } from './manage-teacher.service';

describe('ManageTeacherService', () => {
  let service: ManageTeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageTeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
