import React, { Component, Fragment } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

let cellArray = []

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columnDefs: [],
            rowData: []
        }
    }

    initDrawGrid = () => {
      const alpha = 90 //z = 90
      let columns = []
      let rows = []
      let alphaIdx = 65 //a = 65

      while(true) {
        //초기 rownum 세팅
        if (alphaIdx === 65) {
          columns.push({
            headerName: '#',
            colId: 'rowNum',
            valueGetter: 'node.id',
            width: 50
          })
        } 
        columns.push({
          field: String.fromCharCode(alphaIdx),
          editable: true,
          resizable: true,
          width: 60, 
          rowSelection: 'single',
          rowBuffer: 0,
          cellRenderer : this.drawCellRenderer  //cell 그리면서 동작하는 함수, cell id 주면서 row랑 binding이 어긋나서 value값 안보이는듯 
        })
        alphaIdx ++ 
        if (alphaIdx > alpha) break
      }

      columns.forEach(element => {
        rows.push({
          fieldNm: '',
          columnId: '',
        })
      })

      // TODO issue : setState 여러건 한번에 처리시 오류남 이유 찾으면 주석으로 작성하기
      this.setState({
        columnDefs: columns
      })
      this.setState({
        rowData: rows
      })
    }
   
    //cell 그리면서 ID값 부여
    drawCellRenderer = (e) => {
      e.data.columnId = e.colDef.field + e.rowIndex
      return e.value
    }

    getCellId = (e) => {
      alert(e.data.columnId)  //cell 수정시, ID값 확인용 alert
    }

    setCellValue = (e) => {

    }
    
    //click시 cell ID 배열에 push
    setCellArray = (e) => {
      cellArray = [];  //초기화
      cellArray.push({
        columnId: e.data.columnId
      })
    }

    render() {
        return (
          <Fragment>
            <h1>GRID</h1>
            <button onClick={this.initDrawGrid}>EXCEL 시작하기</button>
            <div
                className="ag-theme-balham"
                style={{ height: '3000px', width: '6000px' }}
            >
                <AgGridReact
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    onCellValueChanged={this.getCellId}
                    onCellClicked={this.setCellArray}>
                </AgGridReact>
            </div>
          </Fragment>
            
        );
    }
}

export default App;