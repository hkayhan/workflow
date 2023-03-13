import React from 'react';

function Home(props) {
    return (
        <div>

            <h1 className={"text-k-red my-3"}>Akış Kontrol Ekranı</h1>

            <h4>Bu Otomasyonda</h4>
            <ul>
                <li>
                    Akış şablonları oluşturabilir
                </li>
                <li>
                    Şablonları kullanarak yeni iş akışları oluşturabilir ve takip edilebilir
                </li>
            </ul>

        </div>
    );
}

export default Home;