/**
 * Columndefinition.
 *
 *  @param columnDef ColumnDefinition
 *  @param header Headertext
 *  @param cell Zellemdefinition
 *  @param disableSort Spalte sortierbar
 * 
 * @class ColumnDefinition
 */

export interface ColumnDefinition {
    columnDef: string;
    header: string;
    cell: (row: any) => string;
    disableSort: Boolean;
}