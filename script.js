
// Direction-aware hover effect
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.direction-item');
    const directions = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left' };
    
    // Функция определения направления
    function getDirection(ev, element) {
        const rect = element.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        const width = rect.width;
        const height = rect.height;
        
        // Определяем сектор
        const top = y < height / 3;
        const bottom = y > height * 2 / 3;
        const left = x < width / 3;
        const right = x > width * 2 / 3;
        
        if (top && left) return 'top';
        if (top && right) return 'right';
        if (bottom && left) return 'bottom';
        if (bottom && right) return 'left';
        
        // По умолчанию
        if (top) return 'top';
        if (bottom) return 'bottom';
        if (left) return 'left';
        if (right) return 'right';
        
        return 'top'; // fallback
    }
    
    // Обработчики для каждой карточки
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // Удаляем старые классы
            this.classList.remove('in-top', 'in-right', 'in-bottom', 'in-left');
            
            // Определяем направление и добавляем класс
            const direction = getDirection(e, this);
            this.classList.add('in-' + direction);
        });
        
        card.addEventListener('mouseleave', function(e) {
            // Удаляем старые классы
            this.classList.remove('out-top', 'out-right', 'out-bottom', 'out-left');
            
            // Определяем направление и добавляем класс
            const direction = getDirection(e, this);
            this.classList.add('out-' + direction);
            
            // Через время удаляем классы анимации
            setTimeout(() => {
                this.classList.remove('in-top', 'in-right', 'in-bottom', 'in-left');
                this.classList.remove('out-top', 'out-right', 'out-bottom', 'out-left');
            }, 300);
        });
    });
});
