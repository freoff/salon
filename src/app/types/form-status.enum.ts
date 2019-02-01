export enum FormStatus {
    createNew= 'createNew',
    update = 'update'
}


export namespace FormStatus {
    export function isUpdate(formStatus: FormStatus) {
        return FormStatus.update === formStatus;
    }
}
