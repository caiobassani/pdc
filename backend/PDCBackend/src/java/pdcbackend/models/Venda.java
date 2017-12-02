package pdcbackend.models;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class Venda {

    private Integer idVenda;
    private Cliente cliente;
    private Produto produto;
    private Filial filial;
    private int qtd;
    private float valorUnitario;

    public Venda() {
    }

    public Venda(Integer idVenda, Cliente cliente, Produto produto, Filial filial, int qtd, float valorUnitario) {
        this.idVenda = idVenda;
        this.cliente = cliente;
        this.produto = produto;
        this.filial = filial;
        this.qtd = qtd;
        this.valorUnitario = valorUnitario;
    }

    public Integer getIdVenda() {
        return idVenda;
    }

    public void setIdVenda(Integer idVenda) {
        this.idVenda = idVenda;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Filial getFilial() {
        return filial;
    }

    public void setFilial(Filial filial) {
        this.filial = filial;
    }

    public int getQtd() {
        return qtd;
    }

    public void setQtd(int qtd) {
        this.qtd = qtd;
    }

    public float getValorUnitario() {
        return valorUnitario;
    }

    public void setValorUnitario(float valorUnitario) {
        this.valorUnitario = valorUnitario;
    }
}
