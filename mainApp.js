// if (window.self === window.top) {
//     document.body.innerText = 'This application is for use in the Salesforce Marketing Cloud Content Builder only!';;
// }

let sdk = new window.sfdc.BlockSDK(); //initalize SDK



let mapData = {
    sku: ''
};

let defaultContent = '<p>Default</p>';

let saveData = () => {
    console.log('Saving data...');

    mapData.sku = document.getElementById('sku').value;

    sdk.setData(mapData, (data) => {
        // mapData = data;
        let content = `%%[set @RowSet = LookupRows('yopede_products','SKU','${mapData.sku}') set @RowCount = RowCount(@RowSet) if @RowCount > 0 then set @row = Row(@RowSet, 1) set @SKU = Field(@row, 'SKU') set @Name = Field(@row, 'Name')  set @Description = Field(@row, 'Description') set @Image = Field(@row, 'Image') set @Link = Field(@row, 'Link') set @Price = Field(@row, 'Price') endif]%%SKU: %%=v(@SKU)=%% <br />Name: %%=v(@Name)=%% <br />Description: %%=v(@Description)=%% <br />Image: %%=v(@Image)=%% <br />Link: %%=v(@Link)=%% <br />Price: %%=v(@Price)=%%`;
        let superContent = defaultContent;


        //check for ampscript
        if (content.search('%%') === -1) {
            superContent = content;
        }

        console.log('content: ' + content);

        sdk.setSuperContent(decodeURI(superContent), (newSuperContent) => {});
        sdk.setContent(content);

    });

    console.log(JSON.stringify(mapData));

}

let fetchData = () => {

    console.log('Loading data...');

    sdk.getData((data) => {
        if (Object.keys(data).length > 0) {
            mapData = data;

            document.getElementById('sku').value = mapData.sku;
            console.log('Found data!');
        }
    });

    console.log(JSON.stringify(mapData));
}

window.onload = fetchData;
window.onchange = saveData;