export const renderTableBody = (results) => {
    const tableBody = document.querySelector('#result-table-body');

    const tableRows = results.map((item, index) => {
        return (
            `<tr>
                <td>${index+1}</td>
                <td><img src="${item.LogoPath}" alt="logo" class="brand-logo" /></td>
                <td>
                    <div>
                        <h6 class="item-title">${item.Title}</h6>
                        <div class="details-container">
                            <span class="details-toggler closed">See Details</span>
                            <div class="details">
                                <p class="url">
                                    <strong>Domain:</strong>
                                    <a href="https://${item.Domain}" target="_blank">https://${item.Domain}</a>
                                </p>
                                <p class="comp-info">
                                    <strong>Data Compromised:</strong>
                                    <span>${item.DataClasses.join(', ')}</span>
                                </p>
                                <p class="overview">
                                    <strong>Description:</strong>
                                    <span>${item.Description}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="text-center">${item.BreachDate}</td>
            </tr>`
        );
    });

    tableBody.innerHTML = tableRows.join('');
};
