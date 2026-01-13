declare module 'formidable' {
  import { IncomingForm, File, Fields, Files, Part } from 'formidable';
  export default class FormidableForm extends IncomingForm {}
  export { IncomingForm, File, Fields, Files, Part };
}
