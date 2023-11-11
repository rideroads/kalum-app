import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarreraTecnicaService } from '../../shared/services/carrera-tecnica.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-carrera-tecnica',
  templateUrl: './form-carrera-tecnica.component.html',
  styles: [
  ]
})
export class FormCarreraTecnicaComponent implements OnInit {
  
  public carreraTecnicaFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private carreraTecnicaService: CarreraTecnicaService,
    private dialogRef: MatDialogRef<FormCarreraTecnicaComponent>, @Inject(MAT_DIALOG_DATA) public data:any){
    this.carreraTecnicaFormGroup = this.formBuilder.group({
      nombre: [data != null ? data.nombre : '', Validators.required]
    })

  }

  ngOnInit(): void {
    
  }

  onSave(){
    let dataForm = {
      nombre: this.carreraTecnicaFormGroup.get('nombre')?.value
    }
    if(this.data != null){
      this.carreraTecnicaService.updateCarreraTecnica({carreraId: this.data.carreraId, nombre: dataForm.nombre}).subscribe({
        next:(data) => {
          Swal.fire({
            icon: 'success',
            title: 'Carreras Tecnicas',
            text: `Se Modifico Correctamente la Carrera ${dataForm.nombre}`,
            footer: '<a href="">kalum-app v1.0.0</a>'
          }).then(result => {
            if(result.isConfirmed){
              this.dialogRef.close(1);
            }
          })
        },
        error: (error) => {
          if(error.status == 400 || error.status == 503 || error.status == 404){
            Swal.fire({
              icon: 'error',
              title: 'Carreras Tecnicas',
              text: `No fue posible actualizar la informacion, valide la informacion`,
              footer: '<a href="">kalum-app v1.0.0</a>'
            }).then(result => {
              if(result.isConfirmed){
                this.dialogRef.close(2);
              }
            })
          }
        },
        complete: () => console.log('proceso finalizado')
      })
    }
    else {
      this.carreraTecnicaService.addCarreraTecnica(dataForm).subscribe((response:any) => {
        console.log('respuesta desde la api')
        /*console.log(JSON.stringify(response))
       /* if(response.StatusCode == 201){
          Swal.fire({
            icon: 'success',
            title: 'Carreras Tecnicas',
            text: `Se Agrego Correctamente la Carrera ${response.nombre}`,
            footer: '<a href="">kalum-app v1.0.0</a>'
          }).then(result => {
            if(result.isConfirmed){
              this.dialogRef.close(1)
            }
          })
        } else if (response.HttpErrorResponse.error.httpStatusCode == 503){
          this.dialogRef.close(2);
        } */
      }); 
    }
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  
}
