import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RemesasService } from '../../services/remesas.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  updateForm: FormGroup
  numberPattern: RegExp = /^\**?\d+\.?\d*/

  constructor(private fb: FormBuilder,
    private remesasService: RemesasService,
    private toastService: ToastService) {
    this.updateForm = this.fb.group({
      id: this.fb.control<string>("********", [Validators.required, Validators.maxLength(8), Validators.pattern(this.numberPattern)])
    })
  }

  pressKey(key: string) {
    this.userInput(new KeyboardEvent('keypress', {key}))
  }

  submit() {
    if (this.updateForm.valid) {
      let value: string = this.updateForm.get('id')?.value
      value = value.replaceAll('*', '')
      this.remesasService.setRemesaAsCharged(+value).subscribe((res) => {
        this.toastService.add(res)
      })
    } else {
      this.toastService.add({
        title: "Error",
        message: "Formato de id incorrecto",
        type: "danger"
      })
      this.updateForm.markAllAsTouched()
      this.updateForm.markAsDirty()
    }
  }

  userInput(event: KeyboardEvent) {
    event.preventDefault()
    event.stopPropagation()
    if (!isNaN(+event.key) || event.key === '.' || event.key === 'Backspace') {
      let value: string = this.updateForm.get('id')?.value
      value = value.replaceAll('*', '')
      if (event.key === 'Backspace') {
        if (value.length !== 0) value = value.slice(0, -1)
      } else {
        if (value.length === 8 || (value.includes('.') && event.key === '.') || (value.length === 0 && event.key === '0')) return
        value += event.key
      }
      value = value.padStart(8, '*')
      this.updateForm.get('id')?.setValue(value)
    }
  }
}
