
document.querySelectorAll('.resizer').forEach(resizer => {
    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const th = resizer.parentElement;
        const columnIndex = Array.from(th.parentElement.children).indexOf(th);
        const table = th.closest('table');
        const initialX = e.pageX;
        const initialWidth = th.offsetWidth;

        const tableRows = Array.from(table.querySelectorAll('tr')).map(row => row.children[columnIndex]);

        function resizeColumn(e) {
            const diffX = e.pageX - initialX;
            const newWidth = Math.max(initialWidth + diffX, 50); // Minimum width for readability
            th.style.width = `${newWidth}px`;
            tableRows.forEach(cell => {
                cell.style.width = `${newWidth}px`;
            });
        }

        function stopResize() {
            document.removeEventListener('mousemove', resizeColumn);
            document.removeEventListener('mouseup', stopResize);
        }

        document.addEventListener('mousemove', resizeColumn);
        document.addEventListener('mouseup', stopResize);
    });
});
