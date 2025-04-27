import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ReportService {
  constructor() {}

  async getActivitiesReport() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte Actividades');

    worksheet.columns = [
      { header: 'Nombre', key: 'name', width: 30 },
      { header: 'Descripción', key: 'description', width: 50 },
      { header: 'Tipo', key: 'type', width: 20 },
      { header: 'SubTipo', key: 'SubType', width: 20 },
      { header: 'Fecha de Inicio', key: 'startDate', width: 20 },
      { header: 'Fecha de Fin', key: 'endDate', width: 20 },
      { header: 'Estado', key: 'status', width: 20 },
      { header: 'Responsable', key: 'responsible', width: 30 },
      { header: 'Creado por', key: 'createdBy', width: 30 },
      { header: 'Creado el', key: 'createdAt', width: 20 },
    ];
  }
}
