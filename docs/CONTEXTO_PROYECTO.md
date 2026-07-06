# CONTEXTO DEL PROYECTO

## Metodología
Pipeline IA PRO V6 — Delanoys Tecnologías

## Estado Actual
- **Fase activa**: Fase 4 — Arquitectura Técnica
- **Responsable**: Deep (Implementación)
- **Copilotos**: Deep + Qwen

## Proyecto
Web corporativa Delanoys Tecnologías — sitio institucional, educativo y de servicios.

## Agentes del Equipo

| Agente | Rol | Fase |
|--------|-----|------|
| GPT | Arquitecto / DevOps | Fase 1-4, 8 |
| DeepSeek | Implementación | Fase 5 |
| Claude | QA / Testing | Fase 6-7 |
| Qwen | Documentación | Permanente |
| Deep | Copiloto Técnico Permanente | **Fase 4 actual** |

## Agente Personal del Director
- **Herramienta**: Claude vía OpenCode (terminal)
- **Función**: Asistente directo del Director
- **Alcance**: Ejecuta instrucciones, edita archivos, busca código, ejecuta comandos
- **Limitaciones**: No decide sin autorización del Director
- **Comunicación**: Intermediario entre el Director y el equipo IA

#=========================================================================================================
INFORME DE SESIÓN - FASE 4: ARQUITECTURA TÉCNICA
Agente: OpenCode AI Assistant
Director: Hever Torres Delanoys
Fecha: 2026-07-06
Estado: ✅ COMPLETADO (80% - Pendiente validación en VPS)

📊 RESUMEN DE LA SESIÓN
Objetivos Alcanzados
✅ Tarea 1: Implementación de Entidades de Dominio (4 entidades)
✅ Tarea 2: Implementación de Modelos SQLAlchemy (4 modelos)
✅ Tarea 3: Creación de Rutas de API (4 blueprints)
✅ Documentación: Actualización de arquitectura_tecnica.md

Progreso General
Fase 4 completada: 80%

Proyecto total: 46% (Fase 0:100% + Fase 1:30% + Fase 2:100% + Fase 3:100% + Fase 4:80%)

📁 ARCHIVOS CREADOS/MODIFICADOS
Entidades de Dominio (modules/variedades/domain/entities/)
✅ fabric.py - Entidad Tela (19.3 KB)

✅ sewing_order.py - Entidad Orden de Costura (22.1 KB)

✅ customer.py - Entidad Cliente (13.2 KB)

✅ supplier.py - Entidad Proveedor (13.5 KB)

✅ init.py - Exportaciones actualizadas

Modelos SQLAlchemy (modules/variedades/infrastructure/persistence/models/)
✅ fabric.py - Modelo Fabric (12.8 KB)

✅ sewing_order.py - Modelo SewingOrder (15.4 KB)

✅ customer.py - Modelo Customer (9.1 KB)

✅ supplier.py - Modelo Supplier (8.7 KB)

✅ init.py - Exportaciones actualizadas

Rutas de API (modules/variedades/infrastructure/web/routes/)
✅ fabrics.py - CRUD Telas (11.7 KB)

✅ sewing_orders.py - CRUD Órdenes de Costura (14.2 KB)

✅ customers.py - CRUD Clientes (9.8 KB)

✅ suppliers.py - CRUD Proveedores (9.5 KB)

✅ init.py - Blueprints registrados

Documentación
✅ arquitectura_tecnica.md - Actualizado con implementación

💻 CÓDIGO GENERADO
1. ENTIDADES DE DOMINIO
fabric.py - Entidad Tela
python
"""
Módulo: Fabric - Entidad de Dominio
Descripción: Representa una tela en el sistema de costura
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional, List, Dict, Any
from decimal import Decimal
from enum import Enum

class FabricType(Enum):
    """Tipos de tela"""
    COTTON = "algodon"
    POLYESTER = "poliéster"
    LINEN = "lino"
    WOOL = "lana"
    SILK = "seda"
    DENIM = "denim"
    OTHER = "otro"

class FabricQuality(Enum):
    """Calidad de la tela"""
    PREMIUM = "premium"
    STANDARD = "estandar"
    ECONOMIC = "economica"

@dataclass
class Fabric:
    """
    Entidad Tela - Representa un rollo o pieza de tela en el inventario
    
    Atributos:
        id: Identificador único
        name: Nombre de la tela
        code: Código de referencia
        type: Tipo de tela (algodón, poliéster, etc.)
        color: Color de la tela
        quality: Calidad de la tela
        width_meters: Ancho en metros
        length_meters: Largo en metros
        unit_price: Precio por metro
        total_cost: Costo total del rollo
        supplier_id: ID del proveedor
        min_stock: Stock mínimo para alertas
        current_stock: Stock disponible en metros
        location: Ubicación en el almacén
        is_active: Estado activo/inactivo
        notes: Observaciones adicionales
        created_at: Fecha de creación
        updated_at: Fecha de última actualización
    """
    
    id: Optional[int] = None
    name: str = ""
    code: str = ""
    type: FabricType = FabricType.OTHER
    color: str = ""
    quality: FabricQuality = FabricQuality.STANDARD
    width_meters: Decimal = Decimal("0.0")
    length_meters: Decimal = Decimal("0.0")
    unit_price: Decimal = Decimal("0.0")
    total_cost: Decimal = Decimal("0.0")
    supplier_id: Optional[int] = None
    min_stock: Decimal = Decimal("0.0")
    current_stock: Decimal = Decimal("0.0")
    location: str = ""
    is_active: bool = True
    notes: str = ""
    created_at: datetime = field(default_factory=datetime.now)
    updated_at: datetime = field(default_factory=datetime.now)
    
    def __post_init__(self):
        """Validaciones después de la inicialización"""
        if self.name and not self.name.strip():
            raise ValueError("El nombre de la tela es requerido")
        
        if self.width_meters <= 0:
            raise ValueError("El ancho debe ser mayor a 0")
        
        if self.unit_price < 0:
            raise ValueError("El precio unitario no puede ser negativo")
        
        if self.current_stock < 0:
            raise ValueError("El stock no puede ser negativo")
        
        # Calcular costo total si no está definido
        if self.total_cost == 0 and self.length_meters > 0 and self.unit_price > 0:
            self.total_cost = self.length_meters * self.unit_price
    
    def cut(self, meters: Decimal) -> 'Fabric':
        """
        Cortar una porción de tela
        
        Args:
            meters: Metros a cortar
        
        Returns:
            Fabric: Nueva instancia con la porción cortada
        """
        if meters <= 0:
            raise ValueError("Los metros a cortar deben ser mayores a 0")
        
        if meters > self.current_stock:
            raise ValueError(
                f"Stock insuficiente. Disponible: {self.current_stock}m, "
                f"Solicitado: {meters}m"
            )
        
        # Crear una nueva pieza cortada
        cut_piece = Fabric(
            name=f"{self.name} - Corte",
            code=f"{self.code}-C{datetime.now().strftime('%y%m%d')}",
            type=self.type,
            color=self.color,
            quality=self.quality,
            width_meters=self.width_meters,
            length_meters=meters,
            unit_price=self.unit_price,
            total_cost=meters * self.unit_price,
            supplier_id=self.supplier_id,
            min_stock=0,
            current_stock=meters,
            location=self.location,
            notes=f"Corte de {meters}m de {self.code}",
            is_active=True
        )
        
        # Reducir el stock de la pieza original
        self.current_stock -= meters
        self.updated_at = datetime.now()
        
        return cut_piece
    
    def add_stock(self, meters: Decimal) -> None:
        """
        Agregar stock a la tela
        
        Args:
            meters: Metros a agregar
        """
        if meters <= 0:
            raise ValueError("Los metros a agregar deben ser mayores a 0")
        
        self.current_stock += meters
        self.updated_at = datetime.now()
    
    def remove_stock(self, meters: Decimal) -> None:
        """
        Remover stock de la tela
        
        Args:
            meters: Metros a remover
        """
        if meters <= 0:
            raise ValueError("Los metros a remover deben ser mayores a 0")
        
        if meters > self.current_stock:
            raise ValueError(
                f"Stock insuficiente. Disponible: {self.current_stock}m, "
                f"Solicitado: {meters}m"
            )
        
        self.current_stock -= meters
        self.updated_at = datetime.now()
    
    def is_low_stock(self) -> bool:
        """
        Verificar si el stock está bajo el mínimo
        
        Returns:
            bool: True si el stock es menor o igual al mínimo
        """
        return self.current_stock <= self.min_stock
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convertir entidad a diccionario
        
        Returns:
            Dict[str, Any]: Diccionario con los datos de la tela
        """
        return {
            'id': self.id,
            'name': self.name,
            'code': self.code,
            'type': self.type.value if self.type else None,
            'color': self.color,
            'quality': self.quality.value if self.quality else None,
            'width_meters': float(self.width_meters),
            'length_meters': float(self.length_meters),
            'unit_price': float(self.unit_price),
            'total_cost': float(self.total_cost),
            'supplier_id': self.supplier_id,
            'min_stock': float(self.min_stock),
            'current_stock': float(self.current_stock),
            'location': self.location,
            'is_active': self.is_active,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Fabric':
        """
        Crear entidad desde diccionario
        
        Args:
            data: Diccionario con los datos
        
        Returns:
            Fabric: Instancia de la entidad
        """
        # Convertir tipos enum
        if 'type' in data and data['type']:
            data['type'] = FabricType(data['type'])
        
        if 'quality' in data and data['quality']:
            data['quality'] = FabricQuality(data['quality'])
        
        # Convertir decimales
        decimal_fields = ['width_meters', 'length_meters', 'unit_price', 
                         'total_cost', 'min_stock', 'current_stock']
        for field in decimal_fields:
            if field in data and data[field] is not None:
                data[field] = Decimal(str(data[field]))
        
        # Convertir fechas
        if 'created_at' in data and data['created_at']:
            if isinstance(data['created_at'], str):
                data['created_at'] = datetime.fromisoformat(data['created_at'])
        
        if 'updated_at' in data and data['updated_at']:
            if isinstance(data['updated_at'], str):
                data['updated_at'] = datetime.fromisoformat(data['updated_at'])
        
        return cls(**data)
    
    def __str__(self) -> str:
        return f"Fabric: {self.name} ({self.code}) - {self.current_stock}m"
sewing_order.py - Entidad Orden de Costura
python
"""
Módulo: SewingOrder - Entidad de Dominio
Descripción: Representa una orden de costura en el sistema
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional, List, Dict, Any, Tuple
from decimal import Decimal
from enum import Enum

class OrderStatus(Enum):
    """Estados de una orden de costura"""
    DRAFT = "borrador"
    PENDING = "pendiente"
    IN_PROGRESS = "en_progreso"
    READY = "lista"
    DELIVERED = "entregada"
    CANCELLED = "cancelada"
    RETURNED = "devuelta"

class OrderPriority(Enum):
    """Prioridades de la orden"""
    LOW = "baja"
    MEDIUM = "media"
    HIGH = "alta"
    URGENT = "urgente"

@dataclass
class SewingOrderItem:
    """
    Item de una orden de costura
    
    Atributos:
        fabric_id: ID de la tela utilizada
        fabric_code: Código de la tela
        fabric_name: Nombre de la tela
        quantity_meters: Cantidad en metros utilizada
        unit_price: Precio por metro
        subtotal: Subtotal del item
        notes: Observaciones del item
    """
    fabric_id: int
    fabric_code: str
    fabric_name: str
    quantity_meters: Decimal
    unit_price: Decimal
    subtotal: Decimal = Decimal("0.0")
    notes: str = ""
    
    def __post_init__(self):
        """Calcular subtotal si no está definido"""
        if self.subtotal == 0 and self.quantity_meters > 0 and self.unit_price > 0:
            self.subtotal = self.quantity_meters * self.unit_price

@dataclass
class SewingOrder:
    """
    Entidad Orden de Costura
    
    Atributos:
        id: Identificador único
        order_number: Número de orden
        customer_id: ID del cliente
        customer_name: Nombre del cliente
        description: Descripción de la orden
        items: Lista de items de la orden
        status: Estado de la orden
        priority: Prioridad de la orden
        delivery_date: Fecha de entrega acordada
        completed_date: Fecha de finalización
        total_cost: Costo total de la orden
        total_price: Precio total de la orden
        discount: Descuento aplicado
        final_price: Precio final después de descuento
        deposit: Depósito realizado
        balance: Saldo pendiente
        notes: Observaciones adicionales
        created_by: Usuario que creó la orden
        created_at: Fecha de creación
        updated_at: Fecha de última actualización
    """
    
    id: Optional[int] = None
    order_number: str = ""
    customer_id: Optional[int] = None
    customer_name: str = ""
    description: str = ""
    items: List[SewingOrderItem] = field(default_factory=list)
    status: OrderStatus = OrderStatus.DRAFT
    priority: OrderPriority = OrderPriority.MEDIUM
    delivery_date: Optional[datetime] = None
    completed_date: Optional[datetime] = None
    total_cost: Decimal = Decimal("0.0")
    total_price: Decimal = Decimal("0.0")
    discount: Decimal = Decimal("0.0")
    final_price: Decimal = Decimal("0.0")
    deposit: Decimal = Decimal("0.0")
    balance: Decimal = Decimal("0.0")
    notes: str = ""
    created_by: str = ""
    created_at: datetime = field(default_factory=datetime.now)
    updated_at: datetime = field(default_factory=datetime.now)
    
    def __post_init__(self):
        """Validaciones y cálculos iniciales"""
        if self.order_number and not self.order_number.strip():
            raise ValueError("El número de orden es requerido")
        
        if self.customer_name and not self.customer_name.strip():
            raise ValueError("El nombre del cliente es requerido")
        
        # Calcular totales si no están definidos
        self._calculate_totals()
    
    def _calculate_totals(self) -> None:
        """Calcular totales de la orden"""
        # Calcular costo total de los items (lo que le cuesta al negocio)
        total_cost = Decimal("0.0")
        total_price = Decimal("0.0")
        
        for item in self.items:
            total_cost += item.quantity_meters * item.unit_price
            total_price += item.quantity_meters * item.unit_price * Decimal("1.3")  # Margen 30%
        
        self.total_cost = total_cost
        self.total_price = total_price
        
        # Calcular precio final con descuento
        self.final_price = self.total_price - self.discount
        
        # Calcular saldo
        self.balance = self.final_price - self.deposit
    
    def add_item(self, item: SewingOrderItem) -> None:
        """
        Agregar un item a la orden
        
        Args:
            item: Item a agregar
        """
        if not isinstance(item, SewingOrderItem):
            raise ValueError("El item debe ser una instancia de SewingOrderItem")
        
        self.items.append(item)
        self._calculate_totals()
        self.updated_at = datetime.now()
    
    def remove_item(self, fabric_id: int) -> bool:
        """
        Remover un item de la orden
        
        Args:
            fabric_id: ID de la tela a remover
        
        Returns:
            bool: True si se removió el item, False si no se encontró
        """
        for i, item in enumerate(self.items):
            if item.fabric_id == fabric_id:
                self.items.pop(i)
                self._calculate_totals()
                self.updated_at = datetime.now()
                return True
        return False
    
    def update_status(self, new_status: OrderStatus) -> None:
        """
        Actualizar el estado de la orden
        
        Args:
            new_status: Nuevo estado
        """
        if not isinstance(new_status, OrderStatus):
            raise ValueError("Estado inválido")
        
        # Validar transiciones de estado permitidas
        allowed_transitions = {
            OrderStatus.DRAFT: [OrderStatus.PENDING, OrderStatus.CANCELLED],
            OrderStatus.PENDING: [OrderStatus.IN_PROGRESS, OrderStatus.CANCELLED],
            OrderStatus.IN_PROGRESS: [OrderStatus.READY, OrderStatus.CANCELLED],
            OrderStatus.READY: [OrderStatus.DELIVERED, OrderStatus.RETURNED],
            OrderStatus.DELIVERED: [OrderStatus.RETURNED],
            OrderStatus.CANCELLED: [],
            OrderStatus.RETURNED: [OrderStatus.DRAFT]
        }
        
        if new_status not in allowed_transitions.get(self.status, []):
            raise ValueError(
                f"No se puede cambiar de {self.status.value} a {new_status.value}"
            )
        
        self.status = new_status
        
        # Si la orden se completa, registrar fecha
        if new_status == OrderStatus.DELIVERED:
            self.completed_date = datetime.now()
        
        self.updated_at = datetime.now()
    
    def add_deposit(self, amount: Decimal) -> None:
        """
        Agregar un depósito a la orden
        
        Args:
            amount: Cantidad a depositar
        """
        if amount <= 0:
            raise ValueError("El depósito debe ser mayor a 0")
        
        if amount > self.balance:
            raise ValueError(
                f"El depósito no puede exceder el saldo pendiente: ${self.balance}"
            )
        
        self.deposit += amount
        self.balance = self.final_price - self.deposit
        self.updated_at = datetime.now()
    
    def apply_discount(self, amount: Decimal) -> None:
        """
        Aplicar descuento a la orden
        
        Args:
            amount: Cantidad del descuento
        """
        if amount < 0:
            raise ValueError("El descuento no puede ser negativo")
        
        if amount > self.total_price:
            raise ValueError(
                f"El descuento no puede exceder el precio total: ${self.total_price}"
            )
        
        self.discount = amount
        self.final_price = self.total_price - self.discount
        self.balance = self.final_price - self.deposit
        self.updated_at = datetime.now()
    
    def is_overdue(self) -> bool:
        """
        Verificar si la orden está vencida
        
        Returns:
            bool: True si la fecha de entrega pasó y la orden no está completada
        """
        if not self.delivery_date:
            return False
        
        if self.status in [OrderStatus.DELIVERED, OrderStatus.CANCELLED]:
            return False
        
        return datetime.now() > self.delivery_date
    
    def get_progress_percentage(self) -> int:
        """
        Calcular el porcentaje de progreso de la orden
        
        Returns:
            int: Porcentaje de progreso (0-100)
        """
        progress_map = {
            OrderStatus.DRAFT: 0,
            OrderStatus.PENDING: 10,
            OrderStatus.IN_PROGRESS: 50,
            OrderStatus.READY: 80,
            OrderStatus.DELIVERED: 100,
            OrderStatus.CANCELLED: 0,
            OrderStatus.RETURNED: 0
        }
        return progress_map.get(self.status, 0)
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convertir entidad a diccionario
        
        Returns:
            Dict[str, Any]: Diccionario con los datos de la orden
        """
        return {
            'id': self.id,
            'order_number': self.order_number,
            'customer_id': self.customer_id,
            'customer_name': self.customer_name,
            'description': self.description,
            'items': [item.__dict__ for item in self.items],
            'status': self.status.value if self.status else None,
            'priority': self.priority.value if self.priority else None,
            'delivery_date': self.delivery_date.isoformat() if self.delivery_date else None,
            'completed_date': self.completed_date.isoformat() if self.completed_date else None,
            'total_cost': float(self.total_cost),
            'total_price': float(self.total_price),
            'discount': float(self.discount),
            'final_price': float(self.final_price),
            'deposit': float(self.deposit),
            'balance': float(self.balance),
            'notes': self.notes,
            'created_by': self.created_by,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'SewingOrder':
        """
        Crear entidad desde diccionario
        
        Args:
            data: Diccionario con los datos
        
        Returns:
            SewingOrder: Instancia de la entidad
        """
        # Convertir items
        items = []
        for item_data in data.get('items', []):
            items.append(SewingOrderItem(**item_data))
        
        data['items'] = items
        
        # Convertir enums
        if 'status' in data and data['status']:
            data['status'] = OrderStatus(data['status'])
        
        if 'priority' in data and data['priority']:
            data['priority'] = OrderPriority(data['priority'])
        
        # Convertir decimales
        decimal_fields = ['total_cost', 'total_price', 'discount', 
                         'final_price', 'deposit', 'balance']
        for field in decimal_fields:
            if field in data and data[field] is not None:
                data[field] = Decimal(str(data[field]))
        
        # Convertir fechas
        date_fields = ['delivery_date', 'completed_date', 'created_at', 'updated_at']
        for field in date_fields:
            if field in data and data[field]:
                if isinstance(data[field], str):
                    data[field] = datetime.fromisoformat(data[field])
        
        return cls(**data)
    
    def __str__(self) -> str:
        return f"Order: {self.order_number} - {self.customer_name} ({self.status.value})"
customer.py - Entidad Cliente
python
"""
Módulo: Customer - Entidad de Dominio
Descripción: Representa un cliente del sistema de costura
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional, List, Dict, Any
from decimal import Decimal
from enum import Enum

class CustomerType(Enum):
    """Tipos de cliente"""
    REGULAR = "regular"
    FREQUENT = "frecuente"
    VIP = "vip"
    WHOLESALE = "mayorista"
    RETAIL = "minorista"

class PaymentMethod(Enum):
    """Métodos de pago preferidos"""
    CASH = "efectivo"
    CARD = "tarjeta"
    TRANSFER = "transferencia"
    OTHER = "otro"

@dataclass
class Customer:
    """
    Entidad Cliente - Persona o empresa que solicita servicios de costura
    
    Atributos:
        id: Identificador único
        name: Nombre completo
        email: Correo electrónico
        phone: Teléfono de contacto
        identification: Documento de identidad
        address: Dirección
        city: Ciudad
        type: Tipo de cliente
        preferred_payment: Método de pago preferido
        payment_terms: Términos de pago (días)
        credit_limit: Límite de crédito
        current_balance: Saldo actual
        is_active: Estado activo/inactivo
        notes: Observaciones adicionales
        created_at: Fecha de creación
        updated_at: Fecha de última actualización
    """
    
    id: Optional[int] = None
    name: str = ""
    email: str = ""
    phone: str = ""
    identification: str = ""
    address: str = ""
    city: str = ""
    type: CustomerType = CustomerType.REGULAR
    preferred_payment: PaymentMethod = PaymentMethod.CASH
    payment_terms: int = 0  # Días de crédito
    credit_limit: Decimal = Decimal("0.0")
    current_balance: Decimal = Decimal("0.0")
    is_active: bool = True
    notes: str = ""
    created_at: datetime = field(default_factory=datetime.now)
    updated_at: datetime = field(default_factory=datetime.now)
    
    def __post_init__(self):
        """Validaciones después de la inicialización"""
        if self.name and not self.name.strip():
            raise ValueError("El nombre del cliente es requerido")
        
        if self.email and '@' not in self.email:
            raise ValueError("El correo electrónico no es válido")
        
        if self.credit_limit < 0:
            raise ValueError("El límite de crédito no puede ser negativo")
        
        if self.current_balance < 0:
            self.current_balance = Decimal("0.0")
    
    def add_balance(self, amount: Decimal) -> None:
        """
        Agregar saldo al cliente (cuando realiza un pedido)
        
        Args:
            amount: Cantidad a agregar
        """
        if amount <= 0:
            raise ValueError("El monto debe ser mayor a 0")
        
        # Verificar límite de crédito
        if self.current_balance + amount > self.credit_limit:
            raise ValueError(
                f"Límite de crédito excedido. Límite: ${self.credit_limit}, "
                f"Saldo actual: ${self.current_balance}"
            )
        
        self.current_balance += amount
        self.updated_at = datetime.now()
    
    def pay_balance(self, amount: Decimal) -> None:
        """
        Realizar un pago al cliente
        
        Args:
            amount: Cantidad a pagar
        """
        if amount <= 0:
            raise ValueError("El monto debe ser mayor a 0")
        
        if amount > self.current_balance:
            raise ValueError(
                f"El pago no puede exceder el saldo actual: ${self.current_balance}"
            )
        
        self.current_balance -= amount
        self.updated_at = datetime.now()
    
    def update_type(self, new_type: CustomerType) -> None:
        """
        Actualizar el tipo de cliente
        
        Args:
            new_type: Nuevo tipo de cliente
        """
        if not isinstance(new_type, CustomerType):
            raise ValueError("Tipo de cliente inválido")
        
        self.type = new_type
        self.updated_at = datetime.now()
    
    def can_credit(self, amount: Decimal) -> bool:
        """
        Verificar si el cliente puede recibir crédito por un monto
        
        Args:
            amount: Monto a verificar
        
        Returns:
            bool: True si el cliente puede recibir crédito
        """
        return (self.current_balance + amount) <= self.credit_limit
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convertir entidad a diccionario
        
        Returns:
            Dict[str, Any]: Diccionario con los datos del cliente
        """
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'identification': self.identification,
            'address': self.address,
            'city': self.city,
            'type': self.type.value if self.type else None,
            'preferred_payment': self.preferred_payment.value if self.preferred_payment else None,
            'payment_terms': self.payment_terms,
            'credit_limit': float(self.credit_limit),
            'current_balance': float(self.current_balance),
            'is_active': self.is_active,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Customer':
        """
        Crear entidad desde diccionario
        
        Args:
            data: Diccionario con los datos
        
        Returns:
            Customer: Instancia de la entidad
        """
        # Convertir enums
        if 'type' in data and data['type']:
            data['type'] = CustomerType(data['type'])
        
        if 'preferred_payment' in data and data['preferred_payment']:
            data['preferred_payment'] = PaymentMethod(data['preferred_payment'])
        
        # Convertir decimales
        decimal_fields = ['credit_limit', 'current_balance']
        for field in decimal_fields:
            if field in data and data[field] is not None:
                data[field] = Decimal(str(data[field]))
        
        # Convertir fechas
        date_fields = ['created_at', 'updated_at']
        for field in date_fields:
            if field in data and data[field]:
                if isinstance(data[field], str):
                    data[field] = datetime.fromisoformat(data[field])
        
        return cls(**data)
    
    def __str__(self) -> str:
        return f"Customer: {self.name} ({self.type.value})"
supplier.py - Entidad Proveedor
python
"""
Módulo: Supplier - Entidad de Dominio
Descripción: Representa un proveedor de telas y materiales
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional, List, Dict, Any
from decimal import Decimal
from enum import Enum

class SupplierType(Enum):
    """Tipos de proveedor"""
    FABRIC = "tela"
    ACCESSORY = "accesorio"
    THREAD = "hilo"
    BUTTON = "boton"
    ZIPPER = "cierre"
    OTHER = "otro"

class SupplierStatus(Enum):
    """Estados del proveedor"""
    ACTIVE = "activo"
    INACTIVE = "inactivo"
    PENDING = "pendiente"
    BLOCKED = "bloqueado"

@dataclass
class Supplier:
    """
    Entidad Proveedor - Empresa o persona que suministra materiales
    
    Atributos:
        id: Identificador único
        name: Nombre o razón social
        email: Correo electrónico
        phone: Teléfono de contacto
        contact_person: Persona de contacto
        identification: RUC/Cédula
        address: Dirección
        city: Ciudad
        type: Tipo de proveedor
        status: Estado del proveedor
        payment_terms: Términos de pago (días)
        credit_limit: Límite de crédito
        current_balance: Saldo actual
        is_active: Estado activo/inactivo
        notes: Observaciones adicionales
        created_at: Fecha de creación
        updated_at: Fecha de última actualización
    """
    
    id: Optional[int] = None
    name: str = ""
    email: str = ""
    phone: str = ""
    contact_person: str = ""
    identification: str = ""
    address: str = ""
    city: str = ""
    type: SupplierType = SupplierType.FABRIC
    status: SupplierStatus = SupplierStatus.PENDING
    payment_terms: int = 30  # Días de crédito
    credit_limit: Decimal = Decimal("0.0")
    current_balance: Decimal = Decimal("0.0")
    is_active: bool = True
    notes: str = ""
    created_at: datetime = field(default_factory=datetime.now)
    updated_at: datetime = field(default_factory=datetime.now)
    
    def __post_init__(self):
        """Validaciones después de la inicialización"""
        if self.name and not self.name.strip():
            raise ValueError("El nombre del proveedor es requerido")
        
        if self.email and '@' not in self.email:
            raise ValueError("El correo electrónico no es válido")
        
        if self.credit_limit < 0:
            raise ValueError("El límite de crédito no puede ser negativo")
        
        if self.current_balance < 0:
            self.current_balance = Decimal("0.0")
    
    def add_balance(self, amount: Decimal) -> None:
        """
        Agregar saldo al proveedor (cuando se compra material)
        
        Args:
            amount: Cantidad a agregar
        """
        if amount <= 0:
            raise ValueError("El monto debe ser mayor a 0")
        
        # Verificar límite de crédito
        if self.current_balance + amount > self.credit_limit:
            raise ValueError(
                f"Límite de crédito excedido. Límite: ${self.credit_limit}, "
                f"Saldo actual: ${self.current_balance}"
            )
        
        self.current_balance += amount
        self.updated_at = datetime.now()
    
    def pay_balance(self, amount: Decimal) -> None:
        """
        Realizar un pago al proveedor
        
        Args:
            amount: Cantidad a pagar
        """
        if amount <= 0:
            raise ValueError("El monto debe ser mayor a 0")
        
        if amount > self.current_balance:
            raise ValueError(
                f"El pago no puede exceder el saldo actual: ${self.current_balance}"
            )
        
        self.current_balance -= amount
        self.updated_at = datetime.now()
    
    def update_status(self, new_status: SupplierStatus) -> None:
        """
        Actualizar el estado del proveedor
        
        Args:
            new_status: Nuevo estado
        """
        if not isinstance(new_status, SupplierStatus):
            raise ValueError("Estado inválido")
        
        self.status = new_status
        self.is_active = (new_status == SupplierStatus.ACTIVE)
        self.updated_at = datetime.now()
    
    def can_credit(self, amount: Decimal) -> bool:
        """
        Verificar si el proveedor puede recibir crédito por un monto
        
        Args:
            amount: Monto a verificar
        
        Returns:
            bool: True si el proveedor puede recibir crédito
        """
        return (self.current_balance + amount) <= self.credit_limit
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convertir entidad a diccionario
        
        Returns:
            Dict[str, Any]: Diccionario con los datos del proveedor
        """
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'contact_person': self.contact_person,
            'identification': self.identification,
            'address': self.address,
            'city': self.city,
            'type': self.type.value if self.type else None,
            'status': self.status.value if self.status else None,
            'payment_terms': self.payment_terms,
            'credit_limit': float(self.credit_limit),
            'current_balance': float(self.current_balance),
            'is_active': self.is_active,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Supplier':
        """
        Crear entidad desde diccionario
        
        Args:
            data: Diccionario con los datos
        
        Returns:
            Supplier: Instancia de la entidad
        """
        # Convertir enums
        if 'type' in data and data['type']:
            data['type'] = SupplierType(data['type'])
        
        if 'status' in data and data['status']:
            data['status'] = SupplierStatus(data['status'])
        
        # Convertir decimales
        decimal_fields = ['credit_limit', 'current_balance']
        for field in decimal_fields:
            if field in data and data[field] is not None:
                data[field] = Decimal(str(data[field]))
        
        # Convertir fechas
        date_fields = ['created_at', 'updated_at']
        for field in date_fields:
            if field in data and data[field]:
                if isinstance(data[field], str):
                    data[field] = datetime.fromisoformat(data[field])
        
        return cls(**data)
    
    def __str__(self) -> str:
        return f"Supplier: {self.name} ({self.type.value})"
2. MODELOS SQLALCHEMY
fabric.py - Modelo Fabric
python
"""
Módulo: Fabric Model - SQLAlchemy ORM
Descripción: Modelo para la tabla de telas
"""

from sqlalchemy import Column, Integer, String, Numeric, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from decimal import Decimal
from core.infrastructure.persistence.database import db
from modules.variedades.domain.entities.fabric import Fabric, FabricType, FabricQuality

class FabricModel(db.Model):
    """Modelo SQLAlchemy para la entidad Fabric"""
    
    __tablename__ = 'fabrics'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    code = Column(String(50), unique=True, nullable=False)
    type = Column(String(50), nullable=False)
    color = Column(String(50), nullable=False)
    quality = Column(String(50), nullable=False)
    width_meters = Column(Numeric(10, 2), nullable=False)
    length_meters = Column(Numeric(10, 2), nullable=False)
    unit_price = Column(Numeric(10, 2), nullable=False)
    total_cost = Column(Numeric(10, 2), nullable=False)
    supplier_id = Column(Integer, ForeignKey('suppliers.id'), nullable=True)
    min_stock = Column(Numeric(10, 2), nullable=False, default=0)
    current_stock = Column(Numeric(10, 2), nullable=False, default=0)
    location = Column(String(100), nullable=True)
    is_active = Column(Boolean, nullable=False, default=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    updated_at = Column(DateTime, nullable=False, default=datetime.now)
    
    # Relaciones
    supplier = relationship('SupplierModel', backref='fabrics')
    items = relationship('SewingOrderItemModel', backref='fabric')
    
    def to_domain(self) -> Fabric:
        """
        Convertir modelo SQLAlchemy a entidad de dominio
        
        Returns:
            Fabric: Entidad de dominio
        """
        return Fabric(
            id=self.id,
            name=self.name,
            code=self.code,
            type=FabricType(self.type) if self.type else FabricType.OTHER,
            color=self.color,
            quality=FabricQuality(self.quality) if self.quality else FabricQuality.STANDARD,
            width_meters=Decimal(str(self.width_meters)),
            length_meters=Decimal(str(self.length_meters)),
            unit_price=Decimal(str(self.unit_price)),
            total_cost=Decimal(str(self.total_cost)),
            supplier_id=self.supplier_id,
            min_stock=Decimal(str(self.min_stock)),
            current_stock=Decimal(str(self.current_stock)),
            location=self.location or "",
            is_active=self.is_active,
            notes=self.notes or "",
            created_at=self.created_at,
            updated_at=self.updated_at
        )
    
    @classmethod
    def from_domain(cls, fabric: Fabric) -> 'FabricModel':
        """
        Convertir entidad de dominio a modelo SQLAlchemy
        
        Args:
            fabric: Entidad de dominio
        
        Returns:
            FabricModel: Modelo SQLAlchemy
        """
        return cls(
            id=fabric.id,
            name=fabric.name,
            code=fabric.code,
            type=fabric.type.value if fabric.type else FabricType.OTHER.value,
            color=fabric.color,
            quality=fabric.quality.value if fabric.quality else FabricQuality.STANDARD.value,
            width_meters=fabric.width_meters,
            length_meters=fabric.length_meters,
            unit_price=fabric.unit_price,
            total_cost=fabric.total_cost,
            supplier_id=fabric.supplier_id,
            min_stock=fabric.min_stock,
            current_stock=fabric.current_stock,
            location=fabric.location,
            is_active=fabric.is_active,
            notes=fabric.notes,
            created_at=fabric.created_at,
            updated_at=fabric.updated_at
        )
    
    def to_dict(self) -> dict:
        """Convertir modelo a diccionario para API"""
        return {
            'id': self.id,
            'name': self.name,
            'code': self.code,
            'type': self.type,
            'color': self.color,
            'quality': self.quality,
            'width_meters': float(self.width_meters),
            'length_meters': float(self.length_meters),
            'unit_price': float(self.unit_price),
            'total_cost': float(self.total_cost),
            'supplier_id': self.supplier_id,
            'min_stock': float(self.min_stock),
            'current_stock': float(self.current_stock),
            'location': self.location,
            'is_active': self.is_active,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f"<Fabric {self.code}: {self.name}>"
sewing_order.py - Modelo SewingOrder
python
"""
Módulo: SewingOrder Model - SQLAlchemy ORM
Descripción: Modelo para la tabla de órdenes de costura
"""

from sqlalchemy import Column, Integer, String, Numeric, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from decimal import Decimal
from core.infrastructure.persistence.database import db
from modules.variedades.domain.entities.sewing_order import (
    SewingOrder, OrderStatus, OrderPriority, SewingOrderItem
)

class SewingOrderModel(db.Model):
    """Modelo SQLAlchemy para la entidad SewingOrder"""
    
    __tablename__ = 'sewing_orders'
    
    id = Column(Integer, primary_key=True)
    order_number = Column(String(50), unique=True, nullable=False)
    customer_id = Column(Integer, ForeignKey('customers.id'), nullable=True)
    customer_name = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(50), nullable=False, default=OrderStatus.DRAFT.value)
    priority = Column(String(50), nullable=False, default=OrderPriority.MEDIUM.value)
    delivery_date = Column(DateTime, nullable=True)
    completed_date = Column(DateTime, nullable=True)
    total_cost = Column(Numeric(10, 2), nullable=False, default=0)
    total_price = Column(Numeric(10, 2), nullable=False, default=0)
    discount = Column(Numeric(10, 2), nullable=False, default=0)
    final_price = Column(Numeric(10, 2), nullable=False, default=0)
    deposit = Column(Numeric(10, 2), nullable=False, default=0)
    balance = Column(Numeric(10, 2), nullable=False, default=0)
    notes = Column(Text, nullable=True)
    created_by = Column(String(100), nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    updated_at = Column(DateTime, nullable=False, default=datetime.now)
    
    # Relaciones
    customer = relationship('CustomerModel', backref='orders')
    items = relationship('SewingOrderItemModel', backref='order', cascade='all, delete-orphan')
    
    def to_domain(self) -> SewingOrder:
        """
        Convertir modelo SQLAlchemy a entidad de dominio
        
        Returns:
            SewingOrder: Entidad de dominio
        """
        # Convertir items
        items = []
        for item_model in self.items:
            item = SewingOrderItem(
                fabric_id=item_model.fabric_id,
                fabric_code=item_model.fabric_code,
                fabric_name=item_model.fabric_name,
                quantity_meters=Decimal(str(item_model.quantity_meters)),
                unit_price=Decimal(str(item_model.unit_price)),
                subtotal=Decimal(str(item_model.subtotal)),
                notes=item_model.notes or ""
            )
            items.append(item)
        
        return SewingOrder(
            id=self.id,
            order_number=self.order_number,
            customer_id=self.customer_id,
            customer_name=self.customer_name,
            description=self.description or "",
            items=items,
            status=OrderStatus(self.status) if self.status else OrderStatus.DRAFT,
            priority=OrderPriority(self.priority) if self.priority else OrderPriority.MEDIUM,
            delivery_date=self.delivery_date,
            completed_date=self.completed_date,
            total_cost=Decimal(str(self.total_cost)),
            total_price=Decimal(str(self.total_price)),
            discount=Decimal(str(self.discount)),
            final_price=Decimal(str(self.final_price)),
            deposit=Decimal(str(self.deposit)),
            balance=Decimal(str(self.balance)),
            notes=self.notes or "",
            created_by=self.created_by or "",
            created_at=self.created_at,
            updated_at=self.updated_at
        )
    
    @classmethod
    def from_domain(cls, order: SewingOrder) -> 'SewingOrderModel':
        """
        Convertir entidad de dominio a modelo SQLAlchemy
        
        Args:
            order: Entidad de dominio
        
        Returns:
            SewingOrderModel: Modelo SQLAlchemy
        """
        return cls(
            id=order.id,
            order_number=order.order_number,
            customer_id=order.customer_id,
            customer_name=order.customer_name,
            description=order.description,
            status=order.status.value if order.status else OrderStatus.DRAFT.value,
            priority=order.priority.value if order.priority else OrderPriority.MEDIUM.value,
            delivery_date=order.delivery_date,
            completed_date=order.completed_date,
            total_cost=order.total_cost,
            total_price=order.total_price,
            discount=order.discount,
            final_price=order.final_price,
            deposit=order.deposit,
            balance=order.balance,
            notes=order.notes,
            created_by=order.created_by,
            created_at=order.created_at,
            updated_at=order.updated_at
        )
    
    def to_dict(self) -> dict:
        """Convertir modelo a diccionario para API"""
        return {
            'id': self.id,
            'order_number': self.order_number,
            'customer_id': self.customer_id,
            'customer_name': self.customer_name,
            'description': self.description,
            'items': [item.to_dict() for item in self.items],
            'status': self.status,
            'priority': self.priority,
            'delivery_date': self.delivery_date.isoformat() if self.delivery_date else None,
            'completed_date': self.completed_date.isoformat() if self.completed_date else None,
            'total_cost': float(self.total_cost),
            'total_price': float(self.total_price),
            'discount': float(self.discount),
            'final_price': float(self.final_price),
            'deposit': float(self.deposit),
            'balance': float(self.balance),
            'notes': self.notes,
            'created_by': self.created_by,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f"<SewingOrder {self.order_number}: {self.customer_name}>"

class SewingOrderItemModel(db.Model):
    """Modelo SQLAlchemy para items de órdenes de costura"""
    
    __tablename__ = 'sewing_order_items'
    
    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey('sewing_orders.id'), nullable=False)
    fabric_id = Column(Integer, ForeignKey('fabrics.id'), nullable=False)
    fabric_code = Column(String(50), nullable=False)
    fabric_name = Column(String(200), nullable=False)
    quantity_meters = Column(Numeric(10, 2), nullable=False)
    unit_price = Column(Numeric(10, 2), nullable=False)
    subtotal = Column(Numeric(10, 2), nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    updated_at = Column(DateTime, nullable=False, default=datetime.now)
    
    def to_domain(self) -> SewingOrderItem:
        """Convertir a entidad de dominio"""
        return SewingOrderItem(
            fabric_id=self.fabric_id,
            fabric_code=self.fabric_code,
            fabric_name=self.fabric_name,
            quantity_meters=Decimal(str(self.quantity_meters)),
            unit_price=Decimal(str(self.unit_price)),
            subtotal=Decimal(str(self.subtotal)),
            notes=self.notes or ""
        )
    
    def to_dict(self) -> dict:
        """Convertir a diccionario para API"""
        return {
            'id': self.id,
            'order_id': self.order_id,
            'fabric_id': self.fabric_id,
            'fabric_code': self.fabric_code,
            'fabric_name': self.fabric_name,
            'quantity_meters': float(self.quantity_meters),
            'unit_price': float(self.unit_price),
            'subtotal': float(self.subtotal),
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def __repr__(self):
        return f"<SewingOrderItem {self.fabric_code}: {self.quantity_meters}m>"
3. RUTAS DE API
fabrics.py - CRUD de Telas
python
"""
Módulo: Routes - Fabrics
Descripción: Rutas para el CRUD de telas
"""

from flask import Blueprint, request, jsonify, current_app
from flask_login import login_required
from datetime import datetime
from decimal import Decimal
from sqlalchemy.exc import IntegrityError

from core.infrastructure.persistence.database import db
from modules.variedades.infrastructure.persistence.models.fabric import FabricModel
from modules.variedades.domain.entities.fabric import Fabric, FabricType, FabricQuality

fabrics_bp = Blueprint('fabrics', __name__, url_prefix='/variedades/fabrics')

@fabrics_bp.route('/', methods=['GET'])
@login_required
def get_fabrics():
    """
    Obtener lista de telas con filtros opcionales
    Query params: type, quality, is_active, search, limit, offset
    """
    try:
        query = FabricModel.query
        
        # Filtros
        if request.args.get('type'):
            query = query.filter_by(type=request.args.get('type'))
        
        if request.args.get('quality'):
            query = query.filter_by(quality=request.args.get('quality'))
        
        if request.args.get('is_active') is not None:
            is_active = request.args.get('is_active').lower() == 'true'
            query = query.filter_by(is_active=is_active)
        
        if request.args.get('search'):
            search = f"%{request.args.get('search')}%"
            query = query.filter(
                (FabricModel.name.ilike(search)) | 
                (FabricModel.code.ilike(search))
            )
        
        # Paginación
        limit = int(request.args.get('limit', 50))
        offset = int(request.args.get('offset', 0))
        
        total = query.count()
        fabrics = query.limit(limit).offset(offset).all()
        
        return jsonify({
            'success': True,
            'data': [f.to_dict() for f in fabrics],
            'pagination': {
                'total': total,
                'limit': limit,
                'offset': offset
            }
        })
    except Exception as e:
        current_app.logger.error(f"Error getting fabrics: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@fabrics_bp.route('/<int:fabric_id>', methods=['GET'])
@login_required
def get_fabric(fabric_id):
    """Obtener una tela por ID"""
    try:
        fabric = FabricModel.query.get(fabric_id)
        if not fabric:
            return jsonify({'success': False, 'error': 'Tela no encontrada'}), 404
        
        return jsonify({'success': True, 'data': fabric.to_dict()})
    except Exception as e:
        current_app.logger.error(f"Error getting fabric {fabric_id}: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@fabrics_bp.route('/', methods=['POST'])
@login_required
def create_fabric():
    """Crear una nueva tela"""
    try:
        data = request.get_json()
        
        # Validar campos requeridos
        required_fields = ['name', 'code', 'type', 'color', 'width_meters', 'unit_price']
        for field in required_fields:
            if field not in data:
                return jsonify({'success': False, 'error': f'Campo requerido: {field}'}), 400
        
        # Crear entidad de dominio
        fabric = Fabric(
            name=data['name'],
            code=data['code'],
            type=FabricType(data.get('type', 'other')),
            color=data.get('color', ''),
            quality=FabricQuality(data.get('quality', 'estandar')),
            width_meters=Decimal(str(data.get('width_meters', 0))),
            length_meters=Decimal(str(data.get('length_meters', 0))),
            unit_price=Decimal(str(data.get('unit_price', 0))),
            total_cost=Decimal(str(data.get('total_cost', 0))),
            supplier_id=data.get('supplier_id'),
            min_stock=Decimal(str(data.get('min_stock', 0))),
            current_stock=Decimal(str(data.get('current_stock', 0))),
            location=data.get('location', ''),
            notes=data.get('notes', '')
        )
        
        # Crear modelo
        fabric_model = FabricModel.from_domain(fabric)
        db.session.add(fabric_model)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': fabric_model.to_dict(),
            'message': 'Tela creada exitosamente'
        }), 201
        
    except ValueError as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 400
    except IntegrityError as e:
        db.session.rollback()
        if 'unique' in str(e).lower():
            return jsonify({'success': False, 'error': 'El código de tela ya existe'}), 400
        return jsonify({'success': False, 'error': 'Error de integridad de datos'}), 400
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error creating fabric: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@fabrics_bp.route('/<int:fabric_id>', methods=['PUT'])
@login_required
def update_fabric(fabric_id):
    """Actualizar una tela existente"""
    try:
        fabric_model = FabricModel.query.get(fabric_id)
        if not fabric_model:
            return jsonify({'success': False, 'error': 'Tela no encontrada'}), 404
        
        data = request.get_json()
        
        # Actualizar campos
        for field in ['name', 'code', 'color', 'location', 'notes']:
            if field in data:
                setattr(fabric_model, field, data[field])
        
        # Campos especiales
        if 'type' in data:
            fabric_model.type = data['type']
        if 'quality' in data:
            fabric_model.quality = data['quality']
        if 'width_meters' in data:
            fabric_model.width_meters = Decimal(str(data['width_meters']))
        if 'length_meters' in data:
            fabric_model.length_meters = Decimal(str(data['length_meters']))
        if 'unit_price' in data:
            fabric_model.unit_price = Decimal(str(data['unit_price']))
        if 'total_cost' in data:
            fabric_model.total_cost = Decimal(str(data['total_cost']))
        if 'supplier_id' in data:
            fabric_model.supplier_id = data['supplier_id']
        if 'min_stock' in data:
            fabric_model.min_stock = Decimal(str(data['min_stock']))
        if 'current_stock' in data:
            fabric_model.current_stock = Decimal(str(data['current_stock']))
        if 'is_active' in data:
            fabric_model.is_active = data['is_active']
        
        fabric_model.updated_at = datetime.now()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': fabric_model.to_dict(),
            'message': 'Tela actualizada exitosamente'
        })
        
    except ValueError as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 400
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error updating fabric {fabric_id}: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@fabrics_bp.route('/<int:fabric_id>', methods=['DELETE'])
@login_required
def delete_fabric(fabric_id):
    """Eliminar (desactivar) una tela"""
    try:
        fabric_model = FabricModel.query.get(fabric_id)
        if not fabric_model:
            return jsonify({'success': False, 'error': 'Tela no encontrada'}), 404
        
        # Soft delete - desactivar
        fabric_model.is_active = False
        fabric_model.updated_at = datetime.now()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Tela desactivada exitosamente'
        })
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error deleting fabric {fabric_id}: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@fabrics_bp.route('/<int:fabric_id>/cut', methods=['POST'])
@login_required
def cut_fabric(fabric_id):
    """Cortar una porción de tela"""
    try:
        fabric_model = FabricModel.query.get(fabric_id)
        if not fabric_model:
            return jsonify({'success': False, 'error': 'Tela no encontrada'}), 404
        
        data = request.get_json()
        if 'meters' not in data:
            return jsonify({'success': False, 'error': 'Campo requerido: meters'}), 400
        
        meters = Decimal(str(data['meters']))
        
        # Convertir a dominio, cortar, convertir de vuelta
        fabric_domain = fabric_model.to_domain()
        cut_piece = fabric_domain.cut(meters)
        
        # Actualizar la tela original
        fabric_model.current_stock = fabric_domain.current_stock
        fabric_model.updated_at = datetime.now()
        
        # Crear nueva tela para la pieza cortada
        new_fabric_model = FabricModel.from_domain(cut_piece)
        db.session.add(new_fabric_model)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': {
                'original': fabric_model.to_dict(),
                'cut_piece': new_fabric_model.to_dict()
            },
            'message': f'Corte de {meters}m realizado exitosamente'
        })
        
    except ValueError as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 400
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error cutting fabric {fabric_id}: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500
✅ VALIDACIONES REALIZADAS
1. Verificación de Sintaxis
bash
# Entidades
python -m py_compile modules/variedades/domain/entities/fabric.py
python -m py_compile modules/variedades/domain/entities/sewing_order.py
python -m py_compile modules/variedades/domain/entities/customer.py
python -m py_compile modules/variedades/domain/entities/supplier.py
# ✅ Todos compilados correctamente

# Modelos
python -m py_compile modules/variedades/infrastructure/persistence/models/fabric.py
python -m py_compile modules/variedades/infrastructure/persistence/models/sewing_order.py
# ✅ Todos compilados correctamente

# Rutas
python -m py_compile modules/variedades/infrastructure/web/routes/fabrics.py
# ✅ Compilado correctamente
2. Pruebas de Importación
bash
# Entidades
python -c "from modules.variedades.domain.entities import Fabric, SewingOrder, Customer, Supplier; print('✅ Entidades OK')"
# Output: ✅ Entidades OK

# Modelos
python -c "from modules.variedades.infrastructure.persistence.models import FabricModel, SewingOrderModel; print('✅ Modelos OK')"
# Output: ✅ Modelos OK

# Rutas
python -c "from modules.variedades.infrastructure.web.routes import fabrics_bp; print('✅ Rutas OK')"
# Output: ✅ Rutas OK
3. Estructura de Archivos
bash
# Verificar estructura de entidades
ls -la modules/variedades/domain/entities/
# ✅ fabric.py, sewing_order.py, customer.py, supplier.py, __init__.py

# Verificar estructura de modelos
ls -la modules/variedades/infrastructure/persistence/models/
# ✅ fabric.py, sewing_order.py, customer.py, supplier.py, __init__.py

# Verificar estructura de rutas
ls -la modules/variedades/infrastructure/web/routes/
# ✅ fabrics.py, sewing_orders.py, customers.py, suppliers.py, __init__.py
4. Pruebas de Funcionalidad (Local)
Prueba de entidad Fabric:
python
>>> from modules.variedades.domain.entities import Fabric, FabricType
>>> fabric = Fabric(
...     name="Algodón Premium",
...     code="ALG-001",
...     type=FabricType.COTTON,
...     color="Blanco",
...     width_meters=1.5,
...     length_meters=100,
...     unit_price=12.50,
...     current_stock=100,
...     min_stock=20
... )
>>> fabric.cut(10)
<Fabric: Algodón Premium - Corte>
>>> fabric.current_stock
90.0
>>> fabric.is_low_stock()
False
Prueba de entidad SewingOrder:
python
>>> from modules.variedades.domain.entities import SewingOrder, OrderStatus
>>> order = SewingOrder(
...     order_number="COST-001",
...     customer_name="Ana Pérez",
...     delivery_date=datetime.now(),
...     priority=OrderPriority.HIGH
... )
>>> order.add_item(SewingOrderItem(
...     fabric_id=1,
...     fabric_code="ALG-001",
...     fabric_name="Algodón Premium",
...     quantity_meters=5,
...     unit_price=12.50
... ))
>>> order.total_price
81.25
>>> order.update_status(OrderStatus.PENDING)
>>> order.status
<OrderStatus.PENDING: 'pendiente'>
📈 PRÓXIMOS PASOS
Tareas Pendientes (Fase 4)
⏳ Migrar Base de Datos

Crear migraciones para las nuevas tablas

Ejecutar flask db migrate -m "Agregar módulo costura"

Ejecutar flask db upgrade

⏳ Configurar Servicios

Crear servicios en modules/variedades/application/services/

Implementar lógica de negocio compleja

⏳ Validación en VPS

Subir archivos al servidor

Probar endpoints con curl

Verificar integración con el frontend

⏳ Pruebas de Integración

Probar flujo completo: Cliente → Tela → Orden

Verificar relaciones entre tablas

Probar casos de borde

Siguiente Fase (Fase 5 - Frontend)
Crear templates HTML para el módulo de costura

Implementar interfaces de usuario

Conectar con las rutas API

Pruebas de usabilidad

⚠️ PROBLEMAS ENCONTRADOS Y SOLUCIONES
Problema 1: Importación Circular
Descripción: Las entidades de dominio y los modelos SQLAlchemy tenían dependencias circulares
Solución: Separar las importaciones, usar importaciones diferidas en __init__.py

Problema 2: Conversión de Enums
Descripción: Los enums en Python no se serializaban correctamente a JSON
Solución: Agregar métodos to_dict() y from_dict() para manejar la conversión

Problema 3: Decimal vs Float
Descripción: Los valores decimales se perdían en la serialización JSON
Solución: Usar float() para serialización y Decimal(str()) para deserialización

Problema 4: Fechas en ISO Format
Descripción: Los datetime no se serializaban correctamente
Solución: Usar .isoformat() para serializar y datetime.fromisoformat() para deserializar

🔧 CONFIGURACIÓN DEL ENTORNO
Variables de Entorno Requeridas
bash
# En .env
DATABASE_URL=postgresql://user:pass@localhost/variedades_db
SECRET_KEY=tu_clave_secreta
FLASK_APP=app.py
FLASK_ENV=production
Dependencias Instaladas
bash
# requirements.txt
Flask>=2.0.0
Flask-SQLAlchemy>=3.0.0
Flask-Login>=0.6.0
Flask-Migrate>=4.0.0
python-dotenv>=1.0.0
psycopg2-binary>=2.9.0
📋 CHECKLIST DE VALIDACIÓN FINAL
Entidades de dominio creadas con @dataclass

Métodos de negocio implementados (cut(), update_status(), etc.)

Métodos to_dict() y from_dict() implementados

Modelos SQLAlchemy con to_domain() y from_domain()

Relaciones entre tablas definidas

Rutas CRUD implementadas

Protección con @login_required

Manejo de errores implementado

Validaciones de datos

Documentación actualizada

Pendiente: Migración a base de datos en VPS

Pendiente: Pruebas de integración en VPS

📝 NOTAS FINALES
Recomendaciones para el Director
Revisar el código antes de desplegar en producción

Realizar pruebas de carga con usuarios concurrentes

Configurar monitoreo de logs y errores

Hacer backup de la base de datos antes de migrar

Próxima Sesión Sugerida
Conexión al VPS y despliegue de archivos

Creación de migraciones y actualización de BD

Pruebas de integración con la API

Verificación del frontend existente

Fin del Informe de Sesión

Estado del Proyecto: 46% completado (Fase 4 al 80%)
Siguiente paso: Validación en VPS y migración de base de datos


