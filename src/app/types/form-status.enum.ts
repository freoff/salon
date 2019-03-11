export enum FormState {
  createNew = 'createNew',
  update = 'update',
}

export namespace FormState {
  export function isUpdate(formStatus: FormState) {
    return FormState.update === formStatus;
  }
}
